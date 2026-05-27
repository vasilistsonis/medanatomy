-- ============================================================
-- MedAnatomy — Supabase Schema Migration
-- Run this first: 01_schema.sql
-- ============================================================

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS pg_trgm; -- for full-text search

-- ============================================================
-- CRANIAL NERVES
-- ============================================================
CREATE TABLE cranial_nerves (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  number       VARCHAR(6)   NOT NULL UNIQUE,  -- e.g. 'CN I'
  name         VARCHAR(100) NOT NULL,
  nickname     VARCHAR(100),
  type         VARCHAR(20)  NOT NULL CHECK (type IN ('Sensory','Motor','Mixed')),
  fiber_types  TEXT[]       NOT NULL,
  nuclei       TEXT[],
  ganglion     TEXT,
  foramen      TEXT         NOT NULL,
  origin       TEXT         NOT NULL,
  termination  TEXT         NOT NULL,
  functions    TEXT[]       NOT NULL,
  branches     TEXT[],
  mnemonic     TEXT,
  embryology   TEXT,
  test_method  TEXT,
  created_at   TIMESTAMPTZ  DEFAULT NOW()
);

CREATE TABLE cn_clinical_correlations (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  cranial_nerve_id UUID REFERENCES cranial_nerves(id) ON DELETE CASCADE,
  condition       TEXT NOT NULL,
  description     TEXT NOT NULL,
  signs           TEXT[],
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Full-text search index on cranial nerves
CREATE INDEX idx_cn_search ON cranial_nerves
  USING GIN (to_tsvector('english', name || ' ' || COALESCE(nickname,'') || ' ' || foramen));

-- ============================================================
-- MUSCLES
-- ============================================================
CREATE TABLE muscles (
  id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug           VARCHAR(80) UNIQUE NOT NULL,
  name           VARCHAR(150) NOT NULL,
  region         VARCHAR(80)  NOT NULL,
  origin         TEXT         NOT NULL,
  insertion      TEXT         NOT NULL,
  actions        TEXT[]       NOT NULL,
  nerve          TEXT         NOT NULL,
  nerve_roots    VARCHAR(30),
  blood_supply   TEXT,
  clinical_note  TEXT,
  special_tests  TEXT[],
  notes          TEXT,
  created_at     TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_muscle_region ON muscles(region);
CREATE INDEX idx_muscle_search ON muscles
  USING GIN (to_tsvector('english', name || ' ' || region || ' ' || nerve || ' ' || COALESCE(clinical_note,'')));

-- ============================================================
-- MNEMONICS
-- ============================================================
CREATE TABLE mnemonics (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug        VARCHAR(80) UNIQUE NOT NULL,
  mnemonic    TEXT NOT NULL,
  full_form   TEXT NOT NULL,
  meaning     TEXT NOT NULL,
  category    VARCHAR(80) NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_mnemonic_category ON mnemonics(category);
CREATE INDEX idx_mnemonic_search ON mnemonics
  USING GIN (to_tsvector('english', mnemonic || ' ' || full_form || ' ' || meaning));

-- ============================================================
-- QUIZ QUESTIONS
-- ============================================================
CREATE TABLE quiz_questions (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category     VARCHAR(80)  NOT NULL,
  question     TEXT         NOT NULL,
  options      TEXT[]       NOT NULL,
  answer       TEXT         NOT NULL,
  explanation  TEXT         NOT NULL,
  difficulty   VARCHAR(20)  DEFAULT 'medium' CHECK (difficulty IN ('easy','medium','hard')),
  created_at   TIMESTAMPTZ  DEFAULT NOW()
);

CREATE INDEX idx_quiz_category ON quiz_questions(category);

-- ============================================================
-- USER PROGRESS (optional — for authenticated users)
-- ============================================================
CREATE TABLE user_progress (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id         UUID NOT NULL,  -- Supabase auth.users
  entity_type     VARCHAR(30) NOT NULL CHECK (entity_type IN ('cranial_nerve','muscle','mnemonic','quiz_question')),
  entity_id       UUID NOT NULL,
  status          VARCHAR(20) NOT NULL CHECK (status IN ('unseen','known','review')),
  quiz_correct    INT DEFAULT 0,
  quiz_attempts   INT DEFAULT 0,
  updated_at      TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user_id, entity_type, entity_id)
);

CREATE INDEX idx_progress_user ON user_progress(user_id);

-- RLS policies for user_progress
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own progress"
  ON user_progress FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Public read access for content tables
ALTER TABLE cranial_nerves ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read" ON cranial_nerves FOR SELECT USING (true);

ALTER TABLE cn_clinical_correlations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read" ON cn_clinical_correlations FOR SELECT USING (true);

ALTER TABLE muscles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read" ON muscles FOR SELECT USING (true);

ALTER TABLE mnemonics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read" ON mnemonics FOR SELECT USING (true);

ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read" ON quiz_questions FOR SELECT USING (true);
