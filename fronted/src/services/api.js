const API_URL = 'http://192.168.0.3:5000/api/deliveries';

export const getStats = async () => {
  try {
    const res = await fetch(`${API_URL}/stats`);
    if (!res.ok) throw new Error('Error al obtener estadísticas');
    return await res.json();
  } catch (error) {
    console.error('Error en getStats:', error);
    return { total: 0, pendientes: 0, entregados: 0, cancelados: 0 };
  }
};

export const getDeliveries = async () => {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('Error al obtener delivery');
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error en getDeliveries:', error);
    return [];
  }
};

export const createDelivery = async (data) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Error al crear delivery');
  return res.json();
};

export const updateDeliveryStatus = async (id, estado) => {
  const res = await fetch(`${API_URL}/${id}/estado`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ estado })
  });
  if (!res.ok) throw new Error('Error al actualizar estado');
  return res.json();
};

export const buildWhatsAppLink = (delivery) => {
  if (!delivery) return '#';
  const phoneNumber = '51964227731';
  
  const text = `🚘TEIRA - DELIVERY
👤Cliente: ${delivery.cliente}
📞Teléfono: ${delivery.telefono_cliente}
🕜Hora de entrega: ${delivery.hora_entrega}
📲Teléfono Recepciona: ${delivery.telefono_recepciona}
👥Envía: ${delivery.persona_envia}
📍Dirección: ${delivery.direccion}
📣Referencia: ${delivery.referencia || 'N/A'}
🍤Detalle del envio: ${delivery.detalle_envio || 'N/A'}`;

  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
};