--
-- PostgreSQL database dump
--

\restrict Pqp43E2mYdZRNdmMsqRl3RtxgQewLPEOL5eYEA9GK4r1FMAs3m0Iy1dubF3dQST

-- Dumped from database version 18.0
-- Dumped by pg_dump version 18.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: companies; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.companies (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name character varying(255) NOT NULL,
    sector character varying(255),
    city character varying(255)
);


ALTER TABLE public.companies OWNER TO postgres;

--
-- Name: registrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.registrations (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    session_id uuid NOT NULL,
    firstname character varying(100) NOT NULL,
    lastname character varying(100) NOT NULL,
    email character varying(255) NOT NULL,
    status character varying(20) NOT NULL,
    CONSTRAINT registrations_status_check CHECK (((status)::text = ANY ((ARRAY['registered'::character varying, 'present'::character varying, 'absent'::character varying])::text[])))
);


ALTER TABLE public.registrations OWNER TO postgres;

--
-- Name: sessions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sessions (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    training_id uuid NOT NULL,
    date date NOT NULL,
    "time" time without time zone NOT NULL,
    duration integer,
    company_id uuid NOT NULL,
    trainer_name character varying(255),
    max_participants integer NOT NULL
);


ALTER TABLE public.sessions OWNER TO postgres;

--
-- Name: trainings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.trainings (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    title character varying(255) NOT NULL,
    category character varying(50) NOT NULL,
    description text,
    CONSTRAINT trainings_category_check CHECK (((category)::text = ANY ((ARRAY['stress'::character varying, 'sommeil'::character varying, 'sport'::character varying, 'ergonomie'::character varying])::text[])))
);


ALTER TABLE public.trainings OWNER TO postgres;

--
-- Data for Name: companies; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.companies (id, name, sector, city) FROM stdin;
\.


--
-- Data for Name: registrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.registrations (id, session_id, firstname, lastname, email, status) FROM stdin;
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sessions (id, training_id, date, "time", duration, company_id, trainer_name, max_participants) FROM stdin;
\.


--
-- Data for Name: trainings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.trainings (id, title, category, description) FROM stdin;
\.


--
-- Name: companies companies_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.companies
    ADD CONSTRAINT companies_pkey PRIMARY KEY (id);


--
-- Name: registrations registrations_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.registrations
    ADD CONSTRAINT registrations_email_key UNIQUE (email);


--
-- Name: registrations registrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.registrations
    ADD CONSTRAINT registrations_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: trainings trainings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trainings
    ADD CONSTRAINT trainings_pkey PRIMARY KEY (id);


--
-- Name: registrations registrations_session_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.registrations
    ADD CONSTRAINT registrations_session_id_fkey FOREIGN KEY (session_id) REFERENCES public.sessions(id) ON DELETE CASCADE;


--
-- Name: sessions sessions_company_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_company_id_fkey FOREIGN KEY (company_id) REFERENCES public.companies(id) ON DELETE RESTRICT;


--
-- Name: sessions sessions_training_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_training_id_fkey FOREIGN KEY (training_id) REFERENCES public.trainings(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict Pqp43E2mYdZRNdmMsqRl3RtxgQewLPEOL5eYEA9GK4r1FMAs3m0Iy1dubF3dQST

