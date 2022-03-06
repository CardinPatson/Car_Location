--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2
-- Dumped by pg_dump version 14.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
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
-- Name: customers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.customers (
    id integer NOT NULL,
    first_name character varying NOT NULL,
    last_name character varying NOT NULL,
    password character varying NOT NULL,
    created_at timestamp without time zone DEFAULT '2022-03-01 15:58:50.479677'::timestamp without time zone,
    birth_date date,
    birth_place character varying,
    birth_country character varying,
    address character varying,
    telephone bigint,
    mail character varying NOT NULL
);


ALTER TABLE public.customers OWNER TO postgres;

--
-- Name: Client_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Client_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Client_id_seq" OWNER TO postgres;

--
-- Name: Client_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Client_id_seq" OWNED BY public.customers.id;


--
-- Name: orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders (
    id integer NOT NULL,
    id_car integer DEFAULT '-1'::integer,
    id_cl integer,
    com_date character varying,
    com_start_date timestamp without time zone,
    com_end_date timestamp without time zone,
    price double precision
);


ALTER TABLE public.orders OWNER TO postgres;

--
-- Name: Commands_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Commands_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Commands_id_seq" OWNER TO postgres;

--
-- Name: Commands_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Commands_id_seq" OWNED BY public.orders.id;


--
-- Name: cars; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cars (
    id integer NOT NULL,
    price double precision,
    color character varying,
    doors integer NOT NULL,
    boot_size integer,
    type character varying,
    energy character varying NOT NULL,
    is_automatic boolean NOT NULL,
    passengers integer NOT NULL,
    air_cond boolean NOT NULL,
    id_brand integer
);


ALTER TABLE public.cars OWNER TO postgres;

--
-- Name: Voiture_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Voiture_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Voiture_id_seq" OWNER TO postgres;

--
-- Name: Voiture_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Voiture_id_seq" OWNED BY public.cars.id;


--
-- Name: admins; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.admins (
    id_customers integer NOT NULL
);


ALTER TABLE public.admins OWNER TO postgres;

--
-- Name: cars_brands; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cars_brands (
    id integer NOT NULL,
    brand character varying NOT NULL,
    model character varying NOT NULL
);


ALTER TABLE public.cars_brands OWNER TO postgres;

--
-- Name: images; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.images (
    id integer NOT NULL,
    pic_name character varying
);


ALTER TABLE public.images OWNER TO postgres;

--
-- Name: cars id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cars ALTER COLUMN id SET DEFAULT nextval('public."Voiture_id_seq"'::regclass);


--
-- Name: customers id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customers ALTER COLUMN id SET DEFAULT nextval('public."Client_id_seq"'::regclass);


--
-- Name: orders id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public."Commands_id_seq"'::regclass);


--
-- Data for Name: admins; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.admins (id_customers) FROM stdin;
\.


--
-- Data for Name: cars; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cars (id, price, color, doors, boot_size, type, energy, is_automatic, passengers, air_cond, id_brand) FROM stdin;
1	500	red	4	150	suv	essence	t	5	t	\N
\.


--
-- Data for Name: cars_brands; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cars_brands (id, brand, model) FROM stdin;
\.


--
-- Data for Name: customers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.customers (id, first_name, last_name, password, created_at, birth_date, birth_place, birth_country, address, telephone, mail) FROM stdin;
\.


--
-- Data for Name: images; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.images (id, pic_name) FROM stdin;
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orders (id, id_car, id_cl, com_date, com_start_date, com_end_date, price) FROM stdin;
\.


--
-- Name: Client_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Client_id_seq"', 1, false);


--
-- Name: Commands_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Commands_id_seq"', 1, false);


--
-- Name: Voiture_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Voiture_id_seq"', 1, true);


--
-- Name: customers Client_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT "Client_pkey" PRIMARY KEY (id);


--
-- Name: orders Commands_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT "Commands_pkey" PRIMARY KEY (id);


--
-- Name: images Images_pic_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.images
    ADD CONSTRAINT "Images_pic_name_key" UNIQUE (pic_name);


--
-- Name: cars Voiture_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cars
    ADD CONSTRAINT "Voiture_pkey" PRIMARY KEY (id);


--
-- Name: admins admins_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_pk PRIMARY KEY (id_customers);


--
-- Name: cars_brands cars_brands_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cars_brands
    ADD CONSTRAINT cars_brands_pkey PRIMARY KEY (id);


--
-- Name: fki_id_cars; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_id_cars ON public.orders USING btree (id_car);


--
-- Name: fki_id_client; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_id_client ON public.orders USING btree (id_cl);


--
-- Name: admins admins_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_fk FOREIGN KEY (id_customers) REFERENCES public.customers(id);


--
-- Name: cars cars_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cars
    ADD CONSTRAINT cars_fk FOREIGN KEY (id_brand) REFERENCES public.cars_brands(id);


--
-- Name: orders id_cars; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT id_cars FOREIGN KEY (id_car) REFERENCES public.cars(id) ON DELETE SET DEFAULT;


--
-- Name: images id_cars; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.images
    ADD CONSTRAINT id_cars FOREIGN KEY (id) REFERENCES public.cars(id) ON DELETE CASCADE;


--
-- Name: orders id_client; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT id_client FOREIGN KEY (id_cl) REFERENCES public.customers(id) ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

