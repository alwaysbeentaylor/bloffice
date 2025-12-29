// Dummy data voor BureauLink prototype

export const specialisaties = [
  'ICT',
  'Beveiliging',
  'Horeca',
  'Logistiek',
  'Bouw',
  'Administratie',
  'Zorg',
  'Retail',
  'Industrie',
  'Schoonmaak',
  'Transport',
  'Financieel',
] as const;

export type Specialisatie = typeof specialisaties[number];

export interface Bureau {
  id: string;
  naam: string;
  kvkNummer: string;
  btwNummer: string;
  contactpersoon: string;
  email: string;
  telefoon: string;
  specialisaties: Specialisatie[];
  rating: number;
  aantalReviews: number;
  geverifieerd: boolean;
  aantalVacatures: number;
  aantalSamenwerkingen: number;
  registratieDatum: string;
}

export interface Review {
  id: string;
  bureauId: string;
  reviewerBureauNaam: string;
  rating: number;
  tekst: string;
  datum: string;
}

export interface Vacature {
  id: string;
  bureauId: string;
  bureauNaam: string;
  bureauRating: number;
  functietitel: string;
  categorie: Specialisatie;
  locatie: string;
  beschrijving: string;
  verwachteOpbrengst: number;
  commissieVoorstel: string;
  contactVoorkeur: 'telefoon' | 'email' | 'beide';
  geplaatst: string;
  actief: boolean;
}

export interface Kandidaat {
  id: string;
  bureauId: string;
  bureauNaam: string;
  bureauRating: number;
  naam: string;
  functie: string;
  categorie: Specialisatie;
  locatie: string;
  beschikbaarheid: 'direct' | 'binnen 2 weken' | 'in overleg';
  ervaring: string;
  samenvatting: string;
  uurtarief: number;
  commissieVoorstel: string;
  contactVoorkeur: 'telefoon' | 'email' | 'beide';
  geplaatst: string;
  actief: boolean;
}

// 12 Bureaus met realistische Nederlandse namen
export const bureaus: Bureau[] = [
  {
    id: 'b1',
    naam: 'TechForce Uitzendbureau',
    kvkNummer: '12345678',
    btwNummer: 'NL123456789B01',
    contactpersoon: 'Jan van der Berg',
    email: 'info@techforce.nl',
    telefoon: '020-1234567',
    specialisaties: ['ICT', 'Administratie'],
    rating: 4.8,
    aantalReviews: 23,
    geverifieerd: true,
    aantalVacatures: 8,
    aantalSamenwerkingen: 15,
    registratieDatum: '2023-03-15',
  },
  {
    id: 'b2',
    naam: 'SecuriStaff BV',
    kvkNummer: '23456789',
    btwNummer: 'NL234567890B01',
    contactpersoon: 'Pieter de Vries',
    email: 'contact@securistaff.nl',
    telefoon: '010-2345678',
    specialisaties: ['Beveiliging', 'Transport'],
    rating: 4.5,
    aantalReviews: 18,
    geverifieerd: true,
    aantalVacatures: 5,
    aantalSamenwerkingen: 12,
    registratieDatum: '2023-05-20',
  },
  {
    id: 'b3',
    naam: 'HorecaConnect',
    kvkNummer: '34567890',
    btwNummer: 'NL345678901B01',
    contactpersoon: 'Lisa Bakker',
    email: 'vacatures@horecaconnect.nl',
    telefoon: '030-3456789',
    specialisaties: ['Horeca', 'Retail'],
    rating: 4.7,
    aantalReviews: 31,
    geverifieerd: true,
    aantalVacatures: 12,
    aantalSamenwerkingen: 28,
    registratieDatum: '2022-11-10',
  },
  {
    id: 'b4',
    naam: 'LogiPeople',
    kvkNummer: '45678901',
    btwNummer: 'NL456789012B01',
    contactpersoon: 'Mark Jansen',
    email: 'info@logipeople.nl',
    telefoon: '040-4567890',
    specialisaties: ['Logistiek', 'Transport', 'Industrie'],
    rating: 4.3,
    aantalReviews: 15,
    geverifieerd: true,
    aantalVacatures: 9,
    aantalSamenwerkingen: 8,
    registratieDatum: '2023-01-25',
  },
  {
    id: 'b5',
    naam: 'BouwKracht Personeelsdiensten',
    kvkNummer: '56789012',
    btwNummer: 'NL567890123B01',
    contactpersoon: 'Henk de Groot',
    email: 'werk@bouwkracht.nl',
    telefoon: '050-5678901',
    specialisaties: ['Bouw', 'Industrie'],
    rating: 4.6,
    aantalReviews: 22,
    geverifieerd: true,
    aantalVacatures: 7,
    aantalSamenwerkingen: 19,
    registratieDatum: '2022-08-05',
  },
  {
    id: 'b6',
    naam: 'ZorgSelect',
    kvkNummer: '67890123',
    btwNummer: 'NL678901234B01',
    contactpersoon: 'Annemarie Visser',
    email: 'zorg@zorgselect.nl',
    telefoon: '070-6789012',
    specialisaties: ['Zorg'],
    rating: 4.9,
    aantalReviews: 45,
    geverifieerd: true,
    aantalVacatures: 15,
    aantalSamenwerkingen: 35,
    registratieDatum: '2021-12-01',
  },
  {
    id: 'b7',
    naam: 'Office Professionals',
    kvkNummer: '78901234',
    btwNummer: 'NL789012345B01',
    contactpersoon: 'Sandra Mulder',
    email: 'info@officepro.nl',
    telefoon: '020-7890123',
    specialisaties: ['Administratie', 'Financieel'],
    rating: 4.4,
    aantalReviews: 19,
    geverifieerd: true,
    aantalVacatures: 6,
    aantalSamenwerkingen: 11,
    registratieDatum: '2023-02-14',
  },
  {
    id: 'b8',
    naam: 'CleanForce Nederland',
    kvkNummer: '89012345',
    btwNummer: 'NL890123456B01',
    contactpersoon: 'Ahmed El Amrani',
    email: 'contact@cleanforce.nl',
    telefoon: '010-8901234',
    specialisaties: ['Schoonmaak', 'Horeca'],
    rating: 4.2,
    aantalReviews: 12,
    geverifieerd: true,
    aantalVacatures: 4,
    aantalSamenwerkingen: 6,
    registratieDatum: '2023-06-30',
  },
  {
    id: 'b9',
    naam: 'RetailStaf',
    kvkNummer: '90123456',
    btwNummer: 'NL901234567B01',
    contactpersoon: 'Emma de Jong',
    email: 'vacatures@retailstaf.nl',
    telefoon: '030-9012345',
    specialisaties: ['Retail', 'Horeca', 'Logistiek'],
    rating: 4.5,
    aantalReviews: 27,
    geverifieerd: true,
    aantalVacatures: 10,
    aantalSamenwerkingen: 22,
    registratieDatum: '2022-09-18',
  },
  {
    id: 'b10',
    naam: 'IndustriePro',
    kvkNummer: '01234567',
    btwNummer: 'NL012345678B01',
    contactpersoon: 'Kees Vermeer',
    email: 'werk@industriepro.nl',
    telefoon: '040-0123456',
    specialisaties: ['Industrie', 'Bouw', 'Logistiek'],
    rating: 4.1,
    aantalReviews: 14,
    geverifieerd: true,
    aantalVacatures: 5,
    aantalSamenwerkingen: 7,
    registratieDatum: '2023-04-22',
  },
  {
    id: 'b11',
    naam: 'FlexiWork Uitzendbureau',
    kvkNummer: '11223344',
    btwNummer: 'NL112233445B01',
    contactpersoon: 'Robert Smit',
    email: 'info@flexiwork.nl',
    telefoon: '050-1122334',
    specialisaties: ['Administratie', 'ICT', 'Financieel'],
    rating: 4.6,
    aantalReviews: 33,
    geverifieerd: true,
    aantalVacatures: 11,
    aantalSamenwerkingen: 25,
    registratieDatum: '2022-07-12',
  },
  {
    id: 'b12',
    naam: 'TransportTalent',
    kvkNummer: '22334455',
    btwNummer: 'NL223344556B01',
    contactpersoon: 'Mohammed Yilmaz',
    email: 'jobs@transporttalent.nl',
    telefoon: '010-2233445',
    specialisaties: ['Transport', 'Logistiek'],
    rating: 4.4,
    aantalReviews: 16,
    geverifieerd: true,
    aantalVacatures: 6,
    aantalSamenwerkingen: 10,
    registratieDatum: '2023-08-05',
  },
];

// Bureaus die wachten op verificatie (voor admin pagina)
export const pendingBureaus: Bureau[] = [
  {
    id: 'pb1',
    naam: 'NieuwStart Personeel',
    kvkNummer: '33445566',
    btwNummer: 'NL334455667B01',
    contactpersoon: 'Julia Hendriks',
    email: 'info@nieuwstart.nl',
    telefoon: '020-3344556',
    specialisaties: ['Administratie', 'Retail'],
    rating: 0,
    aantalReviews: 0,
    geverifieerd: false,
    aantalVacatures: 0,
    aantalSamenwerkingen: 0,
    registratieDatum: '2024-12-27',
  },
  {
    id: 'pb2',
    naam: 'QuickHire BV',
    kvkNummer: '44556677',
    btwNummer: 'NL445566778B01',
    contactpersoon: 'Dennis van Dijk',
    email: 'contact@quickhire.nl',
    telefoon: '030-4455667',
    specialisaties: ['Horeca', 'Schoonmaak'],
    rating: 0,
    aantalReviews: 0,
    geverifieerd: false,
    aantalVacatures: 0,
    aantalSamenwerkingen: 0,
    registratieDatum: '2024-12-28',
  },
  {
    id: 'pb3',
    naam: 'GreenWork Uitzendbureau',
    kvkNummer: '55667788',
    btwNummer: 'NL556677889B01',
    contactpersoon: 'Fatima Boulahrouz',
    email: 'info@greenwork.nl',
    telefoon: '040-5566778',
    specialisaties: ['Bouw', 'Industrie'],
    rating: 0,
    aantalReviews: 0,
    geverifieerd: false,
    aantalVacatures: 0,
    aantalSamenwerkingen: 0,
    registratieDatum: '2024-12-28',
  },
];

// 16 Vacatures van verschillende bureaus
export const vacatures: Vacature[] = [
  {
    id: 'v1',
    bureauId: 'b1',
    bureauNaam: 'TechForce Uitzendbureau',
    bureauRating: 4.8,
    functietitel: 'Senior Java Developer',
    categorie: 'ICT',
    locatie: 'Amsterdam',
    beschrijving: `Wij zoeken een ervaren Java Developer voor een klant in de financiële sector. 

De kandidaat moet minimaal 5 jaar ervaring hebben met Java en Spring Boot. Kennis van microservices architectuur is een pré.

Verantwoordelijkheden:
- Ontwikkelen van nieuwe functionaliteiten
- Code reviews uitvoeren
- Samenwerken met het DevOps team
- Documentatie bijhouden

Vereisten:
- HBO/WO werk- en denkniveau
- Minimaal 5 jaar Java ervaring
- Ervaring met Spring Boot, Hibernate
- Goede beheersing van de Nederlandse taal`,
    verwachteOpbrengst: 8500,
    commissieVoorstel: '20% van eerste 3 maanden',
    contactVoorkeur: 'beide',
    geplaatst: '2024-12-20',
    actief: true,
  },
  {
    id: 'v2',
    bureauId: 'b2',
    bureauNaam: 'SecuriStaff BV',
    bureauRating: 4.5,
    functietitel: 'Objectbeveiliger Schiphol',
    categorie: 'Beveiliging',
    locatie: 'Schiphol',
    beschrijving: `Voor onze opdrachtgever op Schiphol zoeken wij beveiligers met ervaring.

Je bent verantwoordelijk voor de veiligheid van passagiers en medewerkers. Flexibele werktijden in ploegendienst.

Eisen:
- Geldig beveiligingsdiploma
- VOG aanwezig
- Bereid om in ploegendienst te werken
- Rijbewijs B is een pré`,
    verwachteOpbrengst: 4200,
    commissieVoorstel: '15% van eerste 2 maanden',
    contactVoorkeur: 'telefoon',
    geplaatst: '2024-12-22',
    actief: true,
  },
  {
    id: 'v3',
    bureauId: 'b3',
    bureauNaam: 'HorecaConnect',
    bureauRating: 4.7,
    functietitel: 'Sous Chef Fine Dining',
    categorie: 'Horeca',
    locatie: 'Rotterdam',
    beschrijving: `Exclusief restaurant in het centrum van Rotterdam zoekt een ervaren Sous Chef.

Je ondersteunt de Executive Chef en bent verantwoordelijk voor de dagelijkse keukenoperatie. Minimaal 3 jaar ervaring in fine dining vereist.

Wij bieden:
- Marktconform salaris
- Doorgroeimogelijkheden
- Werken met verse, seizoensgebonden producten`,
    verwachteOpbrengst: 5500,
    commissieVoorstel: '18% van eerste 3 maanden',
    contactVoorkeur: 'email',
    geplaatst: '2024-12-18',
    actief: true,
  },
  {
    id: 'v4',
    bureauId: 'b4',
    bureauNaam: 'LogiPeople',
    bureauRating: 4.3,
    functietitel: 'Warehouse Manager',
    categorie: 'Logistiek',
    locatie: 'Tilburg',
    beschrijving: `Groot distributicentrum in Tilburg zoekt een Warehouse Manager voor het aansturen van 50+ medewerkers.

Verantwoordelijkheden:
- Dagelijkse aansturing van het warehouse team
- Optimaliseren van logistieke processen
- Rapportage aan de Operations Director
- Budgetbeheer

Ervaring met WMS systemen is vereist.`,
    verwachteOpbrengst: 6800,
    commissieVoorstel: '20% van eerste 2 maanden',
    contactVoorkeur: 'beide',
    geplaatst: '2024-12-15',
    actief: true,
  },
  {
    id: 'v5',
    bureauId: 'b5',
    bureauNaam: 'BouwKracht Personeelsdiensten',
    bureauRating: 4.6,
    functietitel: 'Projectleider Woningbouw',
    categorie: 'Bouw',
    locatie: 'Utrecht',
    beschrijving: `Gevestigde bouwonderneming zoekt een ervaren Projectleider voor woningbouwprojecten in de regio Utrecht.

Jij bent het aanspreekpunt voor opdrachtgevers en stuurt onderaannemers aan. Minimaal 5 jaar ervaring als projectleider in de bouw.

Wij bieden een uitstekend salaris en leaseauto.`,
    verwachteOpbrengst: 7500,
    commissieVoorstel: '22% van eerste 3 maanden',
    contactVoorkeur: 'telefoon',
    geplaatst: '2024-12-10',
    actief: true,
  },
  {
    id: 'v6',
    bureauId: 'b6',
    bureauNaam: 'ZorgSelect',
    bureauRating: 4.9,
    functietitel: 'Verpleegkundige Niveau 4',
    categorie: 'Zorg',
    locatie: 'Den Haag',
    beschrijving: `Verpleeghuis in Den Haag zoekt een gediplomeerde verpleegkundige niveau 4 voor de afdeling psychogeriatrie.

Je bent verantwoordelijk voor:
- Verzorging van bewoners
- Medicatie toediening
- Samenwerking met behandelteam
- Rapportage in het ECD

BIG-registratie is vereist.`,
    verwachteOpbrengst: 4800,
    commissieVoorstel: '15% van eerste 3 maanden',
    contactVoorkeur: 'email',
    geplaatst: '2024-12-23',
    actief: true,
  },
  {
    id: 'v7',
    bureauId: 'b7',
    bureauNaam: 'Office Professionals',
    bureauRating: 4.4,
    functietitel: 'Financieel Administrateur',
    categorie: 'Administratie',
    locatie: 'Amsterdam',
    beschrijving: `Middelgroot accountantskantoor zoekt een Financieel Administrateur voor het verwerken van meerdere administraties.

Ervaring met Exact Online is een must. Je werkt zelfstandig aan de financiële administratie van diverse MKB-klanten.`,
    verwachteOpbrengst: 4500,
    commissieVoorstel: '18% van eerste 2 maanden',
    contactVoorkeur: 'beide',
    geplaatst: '2024-12-19',
    actief: true,
  },
  {
    id: 'v8',
    bureauId: 'b8',
    bureauNaam: 'CleanForce Nederland',
    bureauRating: 4.2,
    functietitel: 'Glazenwasser Hoogbouw',
    categorie: 'Schoonmaak',
    locatie: 'Rotterdam',
    beschrijving: `Schoonmaakbedrijf zoekt ervaren glazenwassers voor hoogbouw projecten in Rotterdam en omgeving.

Je moet beschikken over:
- Ervaring met hoogwerkers
- VCA certificaat
- Rijbewijs B
- Geen last van hoogtevrees`,
    verwachteOpbrengst: 3800,
    commissieVoorstel: '12% van eerste 3 maanden',
    contactVoorkeur: 'telefoon',
    geplaatst: '2024-12-21',
    actief: true,
  },
  {
    id: 'v9',
    bureauId: 'b9',
    bureauNaam: 'RetailStaf',
    bureauRating: 4.5,
    functietitel: 'Store Manager Fashion',
    categorie: 'Retail',
    locatie: 'Eindhoven',
    beschrijving: `Internationale modeketen zoekt een Store Manager voor hun nieuwe flagship store in Eindhoven.

Je bent verantwoordelijk voor:
- Omzet en KPI's
- Team van 15 medewerkers
- Visual merchandising
- Klanttevredenheid

Minimaal 3 jaar ervaring als leidinggevende in retail.`,
    verwachteOpbrengst: 5200,
    commissieVoorstel: '20% van eerste 2 maanden',
    contactVoorkeur: 'email',
    geplaatst: '2024-12-17',
    actief: true,
  },
  {
    id: 'v10',
    bureauId: 'b10',
    bureauNaam: 'IndustriePro',
    bureauRating: 4.1,
    functietitel: 'CNC Operator',
    categorie: 'Industrie',
    locatie: 'Helmond',
    beschrijving: `Metaalbewerkingsbedrijf zoekt ervaren CNC operators voor dagdienst.

Vereisten:
- MBO niveau 3 Verspaning
- Ervaring met Fanuc en Siemens besturing
- Technische tekeningen kunnen lezen
- Nauwkeurig en kwaliteitsgericht`,
    verwachteOpbrengst: 4000,
    commissieVoorstel: '15% van eerste 2 maanden',
    contactVoorkeur: 'beide',
    geplaatst: '2024-12-24',
    actief: true,
  },
  {
    id: 'v11',
    bureauId: 'b11',
    bureauNaam: 'FlexiWork Uitzendbureau',
    bureauRating: 4.6,
    functietitel: 'DevOps Engineer',
    categorie: 'ICT',
    locatie: 'Utrecht',
    beschrijving: `Scale-up in Utrecht zoekt een DevOps Engineer om de cloud infrastructure te verbeteren.

Tech stack: AWS, Kubernetes, Terraform, GitHub Actions

Je werkt nauw samen met development teams en bent verantwoordelijk voor CI/CD pipelines en monitoring.`,
    verwachteOpbrengst: 9000,
    commissieVoorstel: '22% van eerste 3 maanden',
    contactVoorkeur: 'email',
    geplaatst: '2024-12-14',
    actief: true,
  },
  {
    id: 'v12',
    bureauId: 'b12',
    bureauNaam: 'TransportTalent',
    bureauRating: 4.4,
    functietitel: 'Internationaal Chauffeur CE',
    categorie: 'Transport',
    locatie: 'Venlo',
    beschrijving: `Transportbedrijf zoekt ervaren chauffeurs met rijbewijs CE voor internationaal vervoer.

Routes naar Duitsland, België en Frankrijk. Ervaring met koelopleggers is een pré.

Wij bieden:
- Nieuw wagenpark
- Moderne tachograaf
- Goede vergoedingen
- Thuis in het weekend`,
    verwachteOpbrengst: 4500,
    commissieVoorstel: '15% van eerste 3 maanden',
    contactVoorkeur: 'telefoon',
    geplaatst: '2024-12-16',
    actief: true,
  },
  {
    id: 'v13',
    bureauId: 'b1',
    bureauNaam: 'TechForce Uitzendbureau',
    bureauRating: 4.8,
    functietitel: 'Frontend Developer React',
    categorie: 'ICT',
    locatie: 'Amsterdam',
    beschrijving: `Fintech startup zoekt een Frontend Developer met sterke React skills.

Je werkt aan een innovatief betalingsplatform met moderne technologieën. Ervaring met TypeScript en Next.js is een must.`,
    verwachteOpbrengst: 7500,
    commissieVoorstel: '20% van eerste 3 maanden',
    contactVoorkeur: 'beide',
    geplaatst: '2024-12-25',
    actief: true,
  },
  {
    id: 'v14',
    bureauId: 'b6',
    bureauNaam: 'ZorgSelect',
    bureauRating: 4.9,
    functietitel: 'Huisarts Waarnemer',
    categorie: 'Zorg',
    locatie: 'Groningen',
    beschrijving: `Huisartsenpraktijk in Groningen zoekt een waarnemend huisarts voor minimaal 2 dagen per week.

Moderne praktijk met jong team. Mogelijkheid tot uitbreiding uren en eventuele associatie.`,
    verwachteOpbrengst: 12000,
    commissieVoorstel: '25% van eerste maand',
    contactVoorkeur: 'email',
    geplaatst: '2024-12-12',
    actief: true,
  },
  {
    id: 'v15',
    bureauId: 'b3',
    bureauNaam: 'HorecaConnect',
    bureauRating: 4.7,
    functietitel: 'Barista/All-round Medewerker',
    categorie: 'Horeca',
    locatie: 'Den Haag',
    beschrijving: `Gezellige koffiezaak in het centrum van Den Haag zoekt een enthousiaste Barista.

Je bent verantwoordelijk voor het maken van specialty coffee en het bereiden van lichte lunches. Ervaring met Latte Art is een pré.`,
    verwachteOpbrengst: 2800,
    commissieVoorstel: '10% van eerste 3 maanden',
    contactVoorkeur: 'telefoon',
    geplaatst: '2024-12-26',
    actief: true,
  },
  {
    id: 'v16',
    bureauId: 'b7',
    bureauNaam: 'Office Professionals',
    bureauRating: 4.4,
    functietitel: 'Controller',
    categorie: 'Financieel',
    locatie: 'Rotterdam',
    beschrijving: `Internationale handelsonderneming zoekt een Controller voor maandafsluitingen en rapportages.

Ervaring met SAP en Excel op gevorderd niveau vereist. Je rapporteert direct aan de CFO.`,
    verwachteOpbrengst: 6500,
    commissieVoorstel: '20% van eerste 2 maanden',
    contactVoorkeur: 'beide',
    geplaatst: '2024-12-13',
    actief: true,
  },
];

// Kandidaten beschikbaar voor plaatsing
export const kandidaten: Kandidaat[] = [
  {
    id: 'k1',
    bureauId: 'b1',
    bureauNaam: 'TechForce Uitzendbureau',
    bureauRating: 4.8,
    naam: 'Pieter Janssen',
    functie: 'Full Stack Developer',
    categorie: 'ICT',
    locatie: 'Amsterdam',
    beschikbaarheid: 'direct',
    ervaring: '6 jaar',
    samenvatting: `Ervaren Full Stack Developer met sterke kennis van React, Node.js en TypeScript. Heeft gewerkt aan diverse enterprise applicaties in de financiële sector.

Technische skills:
- Frontend: React, Vue.js, TypeScript
- Backend: Node.js, Python, Java
- Databases: PostgreSQL, MongoDB
- Cloud: AWS, Azure

Zoekt een uitdagende positie bij een innovatief bedrijf.`,
    uurtarief: 85,
    commissieVoorstel: '18% van eerste 3 maanden',
    contactVoorkeur: 'beide',
    geplaatst: '2024-12-20',
    actief: true,
  },
  {
    id: 'k2',
    bureauId: 'b6',
    bureauNaam: 'ZorgSelect',
    bureauRating: 4.9,
    naam: 'Fatima El Amrani',
    functie: 'Verpleegkundige Niveau 5',
    categorie: 'Zorg',
    locatie: 'Rotterdam',
    beschikbaarheid: 'binnen 2 weken',
    ervaring: '8 jaar',
    samenvatting: `Gediplomeerde verpleegkundige niveau 5 met ruime ervaring in de ouderenzorg en acute zorg. BIG-geregistreerd en in bezit van diverse aanvullende certificaten.

Ervaring met:
- Geriatrische zorg
- Palliatieve zorg
- Medicatiebeleid
- ECD systemen

Flexibel inzetbaar en bereid tot avond- en weekenddiensten.`,
    uurtarief: 45,
    commissieVoorstel: '15% van eerste 3 maanden',
    contactVoorkeur: 'telefoon',
    geplaatst: '2024-12-22',
    actief: true,
  },
  {
    id: 'k3',
    bureauId: 'b4',
    bureauNaam: 'LogiPeople',
    bureauRating: 4.3,
    naam: 'Stefan de Boer',
    functie: 'Supply Chain Manager',
    categorie: 'Logistiek',
    locatie: 'Eindhoven',
    beschikbaarheid: 'direct',
    ervaring: '10 jaar',
    samenvatting: `Senior Supply Chain Manager met bewezen track record in het optimaliseren van logistieke processen. Ervaring met internationale supply chains en Lean/Six Sigma gecertificeerd.

Competenties:
- End-to-end supply chain management
- Vendor management
- Kostenoptimalisatie
- SAP MM/WM expertise`,
    uurtarief: 95,
    commissieVoorstel: '20% van eerste 2 maanden',
    contactVoorkeur: 'email',
    geplaatst: '2024-12-18',
    actief: true,
  },
  {
    id: 'k4',
    bureauId: 'b3',
    bureauNaam: 'HorecaConnect',
    bureauRating: 4.7,
    naam: 'Marco Visser',
    functie: 'Executive Chef',
    categorie: 'Horeca',
    locatie: 'Den Haag',
    beschikbaarheid: 'in overleg',
    ervaring: '15 jaar',
    samenvatting: `Creatieve Executive Chef met Michelin-ervaring. Gespecialiseerd in Franse en mediterrane keuken met een moderne twist.

Hoogtepunten:
- 3 jaar werkzaam in Michelin-sterrestaurant
- Winnaar Dutch Chef Award 2021
- Ervaring met keukenmanagement tot 20 personen
- Expertise in menu-ontwikkeling en food cost control`,
    uurtarief: 65,
    commissieVoorstel: '22% van eerste 3 maanden',
    contactVoorkeur: 'telefoon',
    geplaatst: '2024-12-15',
    actief: true,
  },
  {
    id: 'k5',
    bureauId: 'b5',
    bureauNaam: 'BouwKracht Personeelsdiensten',
    bureauRating: 4.6,
    naam: 'Henk van der Linden',
    functie: 'Projectleider Bouw',
    categorie: 'Bouw',
    locatie: 'Utrecht',
    beschikbaarheid: 'binnen 2 weken',
    ervaring: '12 jaar',
    samenvatting: `Ervaren projectleider met expertise in woningbouw en utiliteitsbouw. Sterk in het aansturen van bouwteams en onderaannemers.

Kwalificaties:
- VCA VOL gecertificeerd
- Ervaring met projecten tot €50 miljoen
- Goede kennis van bouwregelgeving
- Rijbewijs B en eigen vervoer`,
    uurtarief: 75,
    commissieVoorstel: '18% van eerste 3 maanden',
    contactVoorkeur: 'beide',
    geplaatst: '2024-12-21',
    actief: true,
  },
  {
    id: 'k6',
    bureauId: 'b2',
    bureauNaam: 'SecuriStaff BV',
    bureauRating: 4.5,
    naam: 'Mohammed Yilmaz',
    functie: 'Security Manager',
    categorie: 'Beveiliging',
    locatie: 'Schiphol',
    beschikbaarheid: 'direct',
    ervaring: '9 jaar',
    samenvatting: `Security Manager met uitgebreide ervaring in luchthavenbeveliging en evenementenbeveiliging. Erkend beveiligingsexpert met sterke leidinggevende kwaliteiten.

Certificeringen:
- Beveiligingsdiploma niveau 4
- EHBO/BHV gecertificeerd
- Screened voor Schiphol
- Ervaring met 50+ medewerkers`,
    uurtarief: 55,
    commissieVoorstel: '15% van eerste 2 maanden',
    contactVoorkeur: 'telefoon',
    geplaatst: '2024-12-23',
    actief: true,
  },
  {
    id: 'k7',
    bureauId: 'b7',
    bureauNaam: 'Office Professionals',
    bureauRating: 4.4,
    naam: 'Linda de Graaf',
    functie: 'Financial Controller',
    categorie: 'Financieel',
    locatie: 'Amsterdam',
    beschikbaarheid: 'binnen 2 weken',
    ervaring: '7 jaar',
    samenvatting: `Financial Controller met RA-titel en ervaring in multinationale omgevingen. Sterk in maandafsluitingen, consolidaties en IFRS-rapportage.

Expertise:
- Maand- en jaarafsluitingen
- Budget en forecast
- SAP FI/CO en Oracle Financials
- IFRS en Dutch GAAP`,
    uurtarief: 90,
    commissieVoorstel: '20% van eerste 3 maanden',
    contactVoorkeur: 'email',
    geplaatst: '2024-12-19',
    actief: true,
  },
  {
    id: 'k8',
    bureauId: 'b9',
    bureauNaam: 'RetailStaf',
    bureauRating: 4.5,
    naam: 'Sophie Bakker',
    functie: 'Retail Operations Manager',
    categorie: 'Retail',
    locatie: 'Rotterdam',
    beschikbaarheid: 'direct',
    ervaring: '8 jaar',
    samenvatting: `Retail Operations Manager met ervaring bij grote modeketen. Sterk in het verbeteren van winkelprocessen en aansturen van winkelteams.

Resultaten:
- 25% verbetering in klanttevredenheid
- Succesvolle openingen van 5 nieuwe winkels
- Ervaring met teams tot 100 medewerkers
- Expertise in visual merchandising`,
    uurtarief: 60,
    commissieVoorstel: '18% van eerste 2 maanden',
    contactVoorkeur: 'beide',
    geplaatst: '2024-12-24',
    actief: true,
  },
  {
    id: 'k9',
    bureauId: 'b12',
    bureauNaam: 'TransportTalent',
    bureauRating: 4.4,
    naam: 'Jan Smits',
    functie: 'Transport Planner',
    categorie: 'Transport',
    locatie: 'Venlo',
    beschikbaarheid: 'direct',
    ervaring: '5 jaar',
    samenvatting: `Transport Planner met ervaring in internationaal wegtransport. Expert in routeoptimalisatie en real-time planning.

Skills:
- TMS systemen (Transporeon, Timocom)
- Ritplanning en optimalisatie
- ADR kennis
- Duits en Engels sprekend`,
    uurtarief: 45,
    commissieVoorstel: '15% van eerste 3 maanden',
    contactVoorkeur: 'telefoon',
    geplaatst: '2024-12-25',
    actief: true,
  },
  {
    id: 'k10',
    bureauId: 'b10',
    bureauNaam: 'IndustriePro',
    bureauRating: 4.1,
    naam: 'Erik Vermeulen',
    functie: 'Productie Manager',
    categorie: 'Industrie',
    locatie: 'Helmond',
    beschikbaarheid: 'in overleg',
    ervaring: '11 jaar',
    samenvatting: `Productie Manager met lean manufacturing achtergrond. Ervaring in automotive en metaalindustrie.

Competenties:
- Lean Six Sigma Black Belt
- TPM implementatie
- Team management 80+ FTE
- Continu verbeteren en Kaizen`,
    uurtarief: 70,
    commissieVoorstel: '20% van eerste 2 maanden',
    contactVoorkeur: 'beide',
    geplaatst: '2024-12-17',
    actief: true,
  },
];

// Reviews voor bureaus
export const reviews: Review[] = [
  {
    id: 'r1',
    bureauId: 'b1',
    reviewerBureauNaam: 'HorecaConnect',
    rating: 5,
    tekst: 'Uitstekende samenwerking! Ze hadden snel een geschikte kandidaat voor onze ICT vacature die buiten onze expertise viel. Communicatie was top.',
    datum: '2024-12-01',
  },
  {
    id: 'r2',
    bureauId: 'b1',
    reviewerBureauNaam: 'ZorgSelect',
    rating: 5,
    tekst: 'Betrouwbare partner. Hebben al meerdere malen succesvol samengewerkt voor administratieve functies.',
    datum: '2024-11-15',
  },
  {
    id: 'r3',
    bureauId: 'b1',
    reviewerBureauNaam: 'RetailStaf',
    rating: 4,
    tekst: 'Goede ervaring, snelle respons. Kandidaat was goed voorbereid op het gesprek.',
    datum: '2024-10-22',
  },
  {
    id: 'r4',
    bureauId: 'b3',
    reviewerBureauNaam: 'CleanForce Nederland',
    rating: 5,
    tekst: 'Fantastisch bureau om mee samen te werken. De horeca kandidaten die zij aanbrengen zijn altijd van hoge kwaliteit.',
    datum: '2024-12-10',
  },
  {
    id: 'r5',
    bureauId: 'b3',
    reviewerBureauNaam: 'SecuriStaff BV',
    rating: 4,
    tekst: 'Prettige samenwerking. Commissie-afhandeling ging soepel.',
    datum: '2024-11-28',
  },
  {
    id: 'r6',
    bureauId: 'b6',
    reviewerBureauNaam: 'TechForce Uitzendbureau',
    rating: 5,
    tekst: 'Zeer professioneel bureau met de beste zorgrecruiters. Elke samenwerking is een succes.',
    datum: '2024-12-05',
  },
  {
    id: 'r7',
    bureauId: 'b6',
    reviewerBureauNaam: 'Office Professionals',
    rating: 5,
    tekst: 'Dankzij ZorgSelect konden we een moeilijke zorgvacature vervullen. Aanrader!',
    datum: '2024-11-20',
  },
  {
    id: 'r8',
    bureauId: 'b2',
    reviewerBureauNaam: 'LogiPeople',
    rating: 4,
    tekst: 'Goede kandidaten aangeleverd voor beveiligingsfuncties. Flexibel in afspraken.',
    datum: '2024-12-08',
  },
  {
    id: 'r9',
    bureauId: 'b4',
    reviewerBureauNaam: 'TransportTalent',
    rating: 4,
    tekst: 'Prima samenwerking voor logistieke functies. We vullen elkaar goed aan.',
    datum: '2024-11-30',
  },
  {
    id: 'r10',
    bureauId: 'b5',
    reviewerBureauNaam: 'IndustriePro',
    rating: 5,
    tekst: 'Zeer deskundig op het gebied van bouwpersoneel. Goede screening van kandidaten.',
    datum: '2024-12-15',
  },
];

// Locaties voor filters
export const locaties = [
  'Amsterdam',
  'Rotterdam',
  'Den Haag',
  'Utrecht',
  'Eindhoven',
  'Tilburg',
  'Groningen',
  'Almere',
  'Breda',
  'Nijmegen',
  'Enschede',
  'Arnhem',
  'Haarlem',
  'Zaanstad',
  'Amersfoort',
  'Venlo',
  'Helmond',
  'Schiphol',
  'Landelijk',
];

// Helper functies
export function getBureauById(id: string): Bureau | undefined {
  return bureaus.find((b) => b.id === id);
}

export function getVacatureById(id: string): Vacature | undefined {
  return vacatures.find((v) => v.id === id);
}

export function getVacaturesByBureauId(bureauId: string): Vacature[] {
  return vacatures.filter((v) => v.bureauId === bureauId);
}

export function getReviewsByBureauId(bureauId: string): Review[] {
  return reviews.filter((r) => r.bureauId === bureauId);
}

export function getKandidaatById(id: string): Kandidaat | undefined {
  return kandidaten.find((k) => k.id === id);
}

export function getKandidatenByBureauId(bureauId: string): Kandidaat[] {
  return kandidaten.filter((k) => k.bureauId === bureauId);
}

// Huidige ingelogde bureau (voor demo)
export const currentBureau: Bureau = bureaus[0]; // TechForce Uitzendbureau

