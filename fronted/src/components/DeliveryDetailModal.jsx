import React from 'react';

export default function DeliveryDetailModal({ delivery, onClose }) {
  if (!delivery) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-100 uppercase">
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h3 className="font-bold text-slate-800 text-lg">
            DELIVERY <span className="text-blue-600">{delivery.codigo}</span>
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 font-bold text-xl"
          >
            ✕
          </button>
        </div>

        <div className="space-y-3 text-sm text-slate-700">
          <div><span className="font-semibold text-slate-500 text-xs">CLIENTE:</span> <p className="font-medium">{delivery.cliente}</p></div>
          <div><span className="font-semibold text-slate-500 text-xs">TELÉFONO CLIENTE:</span> <p className="font-medium">{delivery.telefono_cliente}</p></div>
          <div><span className="font-semibold text-slate-500 text-xs">HORA DE ENTREGA:</span> <p className="font-medium">{delivery.hora_entrega}</p></div>
          <div><span className="font-semibold text-slate-500 text-xs">TELÉFONO RECEPCIONA:</span> <p className="font-medium">{delivery.telefono_recepciona}</p></div>
          <div><span className="font-semibold text-slate-500 text-xs">PERSONA QUE ENVÍA:</span> <p className="font-medium">{delivery.persona_envia}</p></div>
          <div><span className="font-semibold text-slate-500 text-xs">DIRECCIÓN:</span> <p className="font-medium">{delivery.direccion}</p></div>
          <div><span className="font-semibold text-slate-500 text-xs">REFERENCIA:</span> <p className="font-medium">{delivery.referencia || 'N/A'}</p></div>
          <div><span className="font-semibold text-slate-500 text-xs">DETALLE DEL ENVÍO:</span> <p className="font-medium">{delivery.detalle_envio || 'N/A'}</p></div>
          <div><span className="font-semibold text-slate-500 text-xs">ESTADO:</span> <p className="font-bold text-blue-600">{delivery.estado}</p></div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold px-4 py-2 rounded-lg text-sm transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}