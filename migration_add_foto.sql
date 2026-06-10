-- Migração: Adicionar coluna 'foto' à tabela 'produto'
USE sabordigital;

ALTER TABLE produto ADD COLUMN foto VARCHAR(255) DEFAULT NULL;
