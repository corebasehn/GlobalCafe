-- ====================================================================
-- SCRIPT DE MIGRACIÓN UNIVERSAL: CORRECCIÓN DE SECUENCIAS AUTOINCREMENTALES
-- Tablas: tipo_cafe, tipo_remision, tipo_empaque, posicion_cafe
-- Funciona tanto en bases con IDENTITY como sin IDENTITY
-- ====================================================================

-- 1. tipo_cafe (id_tipo_cafe)
ALTER TABLE tipo_cafe ALTER COLUMN id_tipo_cafe DROP IDENTITY IF EXISTS;
CREATE SEQUENCE IF NOT EXISTS tipo_cafe_id_tipo_cafe_seq;
ALTER TABLE tipo_cafe ALTER COLUMN id_tipo_cafe SET DEFAULT nextval('tipo_cafe_id_tipo_cafe_seq');
ALTER SEQUENCE tipo_cafe_id_tipo_cafe_seq OWNED BY tipo_cafe.id_tipo_cafe;
SELECT setval('tipo_cafe_id_tipo_cafe_seq', COALESCE((SELECT MAX(id_tipo_cafe) FROM tipo_cafe), 0) + 1, false);

-- 2. tipo_remision (id_tipo_remision)
ALTER TABLE tipo_remision ALTER COLUMN id_tipo_remision DROP IDENTITY IF EXISTS;
CREATE SEQUENCE IF NOT EXISTS tipo_remision_id_tipo_remision_seq;
ALTER TABLE tipo_remision ALTER COLUMN id_tipo_remision SET DEFAULT nextval('tipo_remision_id_tipo_remision_seq');
ALTER SEQUENCE tipo_remision_id_tipo_remision_seq OWNED BY tipo_remision.id_tipo_remision;
SELECT setval('tipo_remision_id_tipo_remision_seq', COALESCE((SELECT MAX(id_tipo_remision) FROM tipo_remision), 0) + 1, false);

-- 3. tipo_empaque (id_tipo_empaque)
ALTER TABLE tipo_empaque ALTER COLUMN id_tipo_empaque DROP IDENTITY IF EXISTS;
CREATE SEQUENCE IF NOT EXISTS tipo_empaque_id_tipo_empaque_seq;
ALTER TABLE tipo_empaque ALTER COLUMN id_tipo_empaque SET DEFAULT nextval('tipo_empaque_id_tipo_empaque_seq');
ALTER SEQUENCE tipo_empaque_id_tipo_empaque_seq OWNED BY tipo_empaque.id_tipo_empaque;
SELECT setval('tipo_empaque_id_tipo_empaque_seq', COALESCE((SELECT MAX(id_tipo_empaque) FROM tipo_empaque), 0) + 1, false);

-- 4. posicion_cafe (id_posicion_cafe)
ALTER TABLE posicion_cafe ALTER COLUMN id_posicion_cafe DROP IDENTITY IF EXISTS;
CREATE SEQUENCE IF NOT EXISTS posicion_cafe_id_posicion_cafe_seq;
ALTER TABLE posicion_cafe ALTER COLUMN id_posicion_cafe SET DEFAULT nextval('posicion_cafe_id_posicion_cafe_seq');
ALTER SEQUENCE posicion_cafe_id_posicion_cafe_seq OWNED BY posicion_cafe.id_posicion_cafe;
SELECT setval('posicion_cafe_id_posicion_cafe_seq', COALESCE((SELECT MAX(id_posicion_cafe) FROM posicion_cafe), 0) + 1, false);
