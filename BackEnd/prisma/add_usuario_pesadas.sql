-- Agrega columnas para registrar qué usuario realizó la primera y segunda pesada en báscula
ALTER TABLE detalle_recepcion
  ADD COLUMN IF NOT EXISTS id_usuario_pesada_entrada INTEGER NULL,
  ADD COLUMN IF NOT EXISTS id_usuario_pesada_salida INTEGER NULL;
