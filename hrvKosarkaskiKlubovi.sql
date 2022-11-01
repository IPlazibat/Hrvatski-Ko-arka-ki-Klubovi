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
-- Name: igrač; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."igrač" (
    ime character varying NOT NULL,
    prezime character varying NOT NULL,
    visina integer NOT NULL,
    dob integer NOT NULL,
    brojdresa integer NOT NULL,
    nazivkluba character varying NOT NULL
);


ALTER TABLE public."igrač" OWNER TO postgres;

--
-- Name: klub; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.klub (
    nazivkluba character varying NOT NULL,
    godinaosnutka integer NOT NULL,
    imedvorane character varying NOT NULL,
    adresa character varying NOT NULL,
    email character varying NOT NULL,
    url_stranice character varying NOT NULL
);


ALTER TABLE public.klub OWNER TO postgres;

--
-- Data for Name: igrač; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."igrač" (ime, prezime, visina, dob, brojdresa, nazivkluba) FROM stdin;
Duje	Putnik	203	21	6	Alkar
Stipe	Polutak	210	28	10	Alkar
Krešimir	Radovčić	188	23	3	Cibona
Ivan	Perasović	200	20	6	Cibona
Ivan	Kučan	180	27	4	Zabok
Jarviss	Garrett	201	31	17	Zabok
Juraj	Pleadin	198	22	7	Šibenka
Frane	Antić	205	32	14	Šibenka
Luka	Božić	206	29	29	Zadar
Tomislav	Petrović	202	37	10	Cedevita
Duje	Rađa	203	25	21	Furnir
Ivan	Majcunić	194	24	6	Gorica
Luka	Krajnović	196	18	18	Bosco
Josip	Barnjak	190	24	8	Škrljevo
\.


--
-- Data for Name: klub; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.klub (nazivkluba, godinaosnutka, imedvorane, adresa, email, url_stranice) FROM stdin;
Alkar	1967	GŠD Ivica Glavan	Put Piketa 25	kkalkar@hks.hr	https://alkar.hr/
Cibona	1935	Košarkaški centar Dražen Petrović	Savska 30	kkcibona@hks.hr	https://www.cibona.com/
Šibenka	1972	SD Baldekin	Ulica Stjepana Radića 44	kksibenkar@hks.hr	https://sibenka.hr/
Zadar	1954	Dvorana Krešimira Ćosića	Splitska ul. 3	kkzadar@hks.hr	https://kkzadar.hr/
Zabok	1998	GSD Zabok	Janka Tomića 1	kkzabok@hks.hr	https://kkzabok.hr/
Cedevita	1976	Dom Sportova	Trg Krešimira Ćosića 11	kkcedevita@hks.hr	https://cedevita.hr/
Furnir	1994	SD Dubrava	Ul. Gjure Prejca 2	kkfurnir@hks.hr	https://furnir.hr/
Gorica	1977	GSD Velika Gorica	Rakarska ul. 19	kkgorica@hks.hr	https://gorica.hr/
Bosco	1999	ŠSD Boško Božić Pepsi	Trnsko ul. 21D	kkbosco@hks.hr	https://bosco.hr/
Škrljevo	2001	SD Mavrinci	Mavrinci 19a	kkskrljevo@hks.hr	https://skrljevo.hr/
\.


--
-- Name: igrač igrač_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."igrač"
    ADD CONSTRAINT "igrač_pkey" PRIMARY KEY (prezime, brojdresa);


--
-- Name: klub klub_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.klub
    ADD CONSTRAINT klub_pkey PRIMARY KEY (nazivkluba);


--
-- Name: igrač igrač_nazivkluba_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."igrač"
    ADD CONSTRAINT "igrač_nazivkluba_fkey" FOREIGN KEY (nazivkluba) REFERENCES public.klub(nazivkluba);


--
-- PostgreSQL database dump complete
--

