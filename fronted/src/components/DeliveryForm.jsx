import React, { useState } from 'react';

export default function DeliveryForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    cliente: '',
    telefono_cliente: '',
    hora_entrega: '',
    telefono_recepciona: '',
    persona_envia: '',
    direccion: '',
    referencia: '',
    detalle_envio: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.toUpperCase() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSuccess(formData);
      setFormData({
        cliente: '',
        telefono_cliente: '',
        hora_entrega: '',
        telefono_recepciona: '',
        persona_envia: '',
        direccion: '',
        referencia: '',
        detalle_envio: ''
      });
    } catch (err) {
      alert('Error al guardar el delivery');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
      <h2 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2">Registrar Nuevo Delivery</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Cliente *</label>
          <input
            type="text"
            name="cliente"
            required
            value={formData.cliente}
            onChange={handleChange}
            placeholder="EJ: GÉNESIS HERRERA"
            className="w-full border border-slate-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none uppercase"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Teléfono Cliente *</label>
          <input
            type="text"
            name="telefono_cliente"
            required
            value={formData.telefono_cliente}
            onChange={handleChange}
            placeholder="EJ: 976255493"
            className="w-full border border-slate-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none uppercase"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Hora de Entrega *</label>
          <input
            type="text"
            name="hora_entrega"
            required
            value={formData.hora_entrega}
            onChange={handleChange}
            placeholder="EJ: 1:00 A 2:00 PM"
            className="w-full border border-slate-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none uppercase"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Teléfono Recepciona *</label>
          <input
            type="text"
            name="telefono_recepciona"
            required
            value={formData.telefono_recepciona}
            onChange={handleChange}
            placeholder="EJ: 940 226 207"
            className="w-full border border-slate-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none uppercase"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Persona que Envía *</label>
          <input
            type="text"
            name="persona_envia"
            required
            value={formData.persona_envia}
            onChange={handleChange}
            placeholder="EJ: JOAN RAMÍREZ"
            className="w-full border border-slate-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none uppercase"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Dirección *</label>
          <input
            type="text"
            name="direccion"
            required
            value={formData.direccion}
            onChange={handleChange}
            placeholder="EJ: SALE DE TALLER - PARA: AREQUIPA 541"
            className="w-full border border-slate-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none uppercase"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Referencia</label>
          <input
            type="text"
            name="referencia"
            value={formData.referencia}
            onChange={handleChange}
            placeholder="EJ: URB. PALERMO"
            className="w-full border border-slate-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none uppercase"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Detalle del Envío</label>
          <input
            type="text"
            name="detalle_envio"
            value={formData.detalle_envio}
            onChange={handleChange}
            placeholder="EJ: 1 CAJA DE EMPANADAS"
            className="w-full border border-slate-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none uppercase"
          />
        </div>
        <div className="md:col-span-2 flex justify-end mt-2">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow transition-colors disabled:opacity-50 text-sm"
          >
            {loading ? 'Registrando...' : 'Registrar Delivery'}
          </button>
        </div>
      </form>
    </div>
  );
}