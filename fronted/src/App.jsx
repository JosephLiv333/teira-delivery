import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import DeliveryForm from './components/DeliveryForm';
import DeliveryList from './components/DeliveryList';
import DeliveryDetailModal from './components/DeliveryDetailModal';
import { getStats, getDeliveries, createDelivery, updateDeliveryStatus, buildWhatsAppLink } from './services/api';

export default function App() {
  const [stats, setStats] = useState({ total: 0, pendientes: 0, entregados: 0, cancelados: 0 });
  const [deliveries, setDeliveries] = useState([]);
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [lastCreated, setLastCreated] = useState(null);

  const fetchData = async () => {
    try {
      const [statsData, deliveriesData] = await Promise.all([getStats(), getDeliveries()]);
      if (statsData) setStats(statsData);
      if (Array.isArray(deliveriesData)) setDeliveries(deliveriesData);
    } catch (err) {
      console.error('Error al cargar datos:', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateDelivery = async (formData) => {
    try {
      const newDelivery = await createDelivery(formData);
      setLastCreated(newDelivery);
      await fetchData();
    } catch (err) {
      alert('Error al guardar el delivery. Revisa que el backend y PostgreSQL estén activos.');
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateDeliveryStatus(id, newStatus);
      await fetchData();
    } catch (err) {
      alert('Error al actualizar el estado');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 p-4 md:p-8">
      <header className="max-w-6xl mx-auto mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-4 border-slate-200">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">
            Empresa de Inversiones y Servicios S.A.C.
          </h1>
          <p className="text-slate-500 text-sm">Sistema de Gestión de Delivery</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto">
        <Dashboard stats={stats} />

        {lastCreated && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex flex-col sm:flex-row justify-between items-center gap-3">
            <div>
              <p className="font-bold text-emerald-800 text-sm">
                ¡Delivery {lastCreated.codigo} registrado exitosamente!
              </p>
              <p className="text-xs text-emerald-600">Presiona el botón para abrir WhatsApp con los datos listos.</p>
            </div>
            <a
              href={buildWhatsAppLink(lastCreated)}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm px-4 py-2 rounded-lg transition-colors shadow"
            >
              Enviar por WhatsApp
            </a>
          </div>
        )}

        <DeliveryForm onSuccess={handleCreateDelivery} />

        <DeliveryList
          deliveries={deliveries}
          onSelectDelivery={setSelectedDelivery}
          onStatusChange={handleStatusChange}
        />
      </main>

      <DeliveryDetailModal
        delivery={selectedDelivery}
        onClose={() => setSelectedDelivery(null)}
      />
    </div>
  );
}