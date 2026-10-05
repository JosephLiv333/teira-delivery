import React from 'react';
import { buildWhatsAppLink } from '../services/api';

export default function DeliveryList({ deliveries = [], onSelectDelivery, onStatusChange }) {
  const safeDeliveries = Array.isArray(deliveries) ? deliveries : [];

  const getBadgeColor = (estado) => {
    switch (estado) {
      case 'Pendiente': return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'Entregado': return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Cancelado': return 'bg-rose-100 text-rose-800 border-rose-300';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-4 border-b border-slate-200 flex justify-between items-center">
        <h2 className="text-lg font-bold text-slate-800">Historial de Delivery</h2>
        <span className="text-xs text-slate-500 font-medium">{safeDeliveries.length} registros</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-slate-50 text-slate-600 text-xs uppercase border-b border-slate-200">
              <th className="py-3 px-4">Código</th>
              <th className="py-3 px-4">Cliente</th>
              <th className="py-3 px-4">Teléfono</th>
              <th className="py-3 px-4">Hora Entrega</th>
              <th className="py-3 px-4">Dirección</th>
              <th className="py-3 px-4">Estado</th>
              <th className="py-3 px-4 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {safeDeliveries.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-6 text-slate-400">
                  No hay envíos de delivery registrados aún.
                </td>
              </tr>
            ) : (
              safeDeliveries.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors uppercase">
                  <td className="py-3 px-4 font-mono font-bold text-blue-600">{item.codigo}</td>
                  <td className="py-3 px-4 font-medium text-slate-800">{item.cliente}</td>
                  <td className="py-3 px-4 text-slate-600">{item.telefono_cliente}</td>
                  <td className="py-3 px-4 text-slate-600">{item.hora_entrega}</td>
                  <td className="py-3 px-4 text-slate-600 max-w-xs truncate">{item.direccion}</td>
                  <td className="py-3 px-4">
                    <select
                      value={item.estado}
                      onChange={(e) => onStatusChange(item.id, e.target.value)}
                      className={`text-xs font-semibold px-2 py-1 rounded-full border cursor-pointer ${getBadgeColor(item.estado)}`}
                    >
                      <option value="Pendiente">Pendiente</option>
                      <option value="Entregado">Entregado</option>
                      <option value="Cancelado">Cancelado</option>
                    </select>
                  </td>
                  <td className="py-3 px-4 text-center space-x-2">
                    <button
                      onClick={() => onSelectDelivery(item)}
                      className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-1 rounded font-medium transition-colors"
                    >
                      Ver Detalle
                    </button>
                    <a
                      href={buildWhatsAppLink(item)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-xs bg-emerald-600 hover:bg-emerald-700 text-white px-2 py-1 rounded font-medium transition-colors"
                    >
                      WhatsApp
                    </a>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}