const pool = require('../config/db');

// Obtener métricas
const getStats = async (req, res) => {
  try {
    const statsQuery = `
      SELECT 
        COUNT(*) AS total,
        COUNT(CASE WHEN estado = 'Pendiente' THEN 1 END) AS pendientes,
        COUNT(CASE WHEN estado = 'Entregado' THEN 1 END) AS entregados,
        COUNT(CASE WHEN estado = 'Cancelado' THEN 1 END) AS cancelados
      FROM deliveries
    `;
    const { rows } = await pool.query(statsQuery);
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Listar todos los deliveries
const getAllDeliveries = async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM deliveries ORDER BY id DESC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener por ID
const getDeliveryById = async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query('SELECT * FROM deliveries WHERE id = $1', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Delivery no encontrado' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear nuevo delivery
const createDelivery = async (req, res) => {
  try {
    const { cliente, telefono_cliente, hora_entrega, telefono_recepciona, persona_envia, direccion, referencia, detalle_envio } = req.body;

    if (!cliente || !telefono_cliente || !hora_entrega || !telefono_recepciona || !persona_envia || !direccion) {
      return res.status(400).json({ message: 'Todos los campos obligatorios deben ser completados' });
    }

    const codeResult = await pool.query("SELECT MAX(id) FROM deliveries");
    const nextId = (parseInt(codeResult.rows[0].max) || 0) + 1;
    const codigo = `DEL-${String(nextId).padStart(6, '0')}`;

    const query = `
      INSERT INTO deliveries (codigo, cliente, telefono_cliente, hora_entrega, telefono_recepciona, persona_envia, direccion, referencia, detalle_envio)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *
    `;
    const values = [
      codigo,
      cliente.toUpperCase(),
      telefono_cliente.toUpperCase(),
      hora_entrega.toUpperCase(),
      telefono_recepciona.toUpperCase(),
      persona_envia.toUpperCase(),
      direccion.toUpperCase(),
      referencia ? referencia.toUpperCase() : '',
      detalle_envio ? detalle_envio.toUpperCase() : ''
    ];

    const { rows } = await pool.query(query, values);
    res.status(201).json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar delivery
const updateDelivery = async (req, res) => {
  try {
    const { id } = req.params;
    const { cliente, telefono_cliente, hora_entrega, telefono_recepciona, persona_envia, direccion, referencia, detalle_envio, estado } = req.body;

    const query = `
      UPDATE deliveries 
      SET cliente = $1, telefono_cliente = $2, hora_entrega = $3, telefono_recepciona = $4, 
          persona_envia = $5, direccion = $6, referencia = $7, detalle_envio = $8, estado = $9
      WHERE id = $10
      RETURNING *
    `;
    const values = [
      cliente.toUpperCase(),
      telefono_cliente.toUpperCase(),
      hora_entrega.toUpperCase(),
      telefono_recepciona.toUpperCase(),
      persona_envia.toUpperCase(),
      direccion.toUpperCase(),
      referencia ? referencia.toUpperCase() : '',
      detalle_envio ? detalle_envio.toUpperCase() : '',
      estado,
      id
    ];

    const { rows } = await pool.query(query, values);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Delivery no encontrado' });
    }

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar estado
const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    const validStatuses = ['Pendiente', 'Entregado', 'Cancelado'];
    if (!validStatuses.includes(estado)) {
      return res.status(400).json({ message: 'Estado no válido' });
    }

    const query = 'UPDATE deliveries SET estado = $1 WHERE id = $2 RETURNING *';
    const { rows } = await pool.query(query, [estado, id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Delivery no encontrado' });
    }

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar delivery
const deleteDelivery = async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query('DELETE FROM deliveries WHERE id = $1 RETURNING *', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Delivery no encontrado' });
    }
    res.json({ message: 'Delivery eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getStats,
  getAllDeliveries,
  getDeliveryById,
  createDelivery,
  updateDelivery,
  updateStatus,
  deleteDelivery
};