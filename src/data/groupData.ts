import { CompanyProfile, ServiceCategory, IndustrySector, ProjectItem, GalleryItem, ProcessStep, QualitySafetyCard, WhyChooseItem, DetailedServiceItem } from '../types';
import { SR_GROUP_HERO_BASE64 } from '../assets/images/srGroupHeroBase64';
import { NEW_SR_INFRA_HERO_BASE64 } from '../assets/images/newSrInfraHeroBase64';
import { SUHEL_ENGINEERING_HERO_BASE64 } from '../assets/images/suhelEngineeringHeroBase64';
import { SR_POWER_SOLUTION_HERO_BASE64 } from '../assets/images/srPowerSolutionHeroBase64';
import { SPONGE_IRON_PLANT_BASE64 } from '../assets/images/spongeIronPlantBase64';
import { ROLLING_MILL_BASE64 } from '../assets/images/rollingMillBase64';
import { POWER_PLANT_BASE64 } from '../assets/images/powerPlantBase64';
import { FERRO_ALLOYS_BASE64 } from '../assets/images/ferroAlloysBase64';
import { SUHEL_PIPING_SITE_BASE64 } from '../assets/images/suhelPipingSiteBase64';
import { SR_GROUP_CRANE_ERECTION_BASE64 } from '../assets/images/srGroupCraneErectionBase64';
import { STEEL_COMPONENT_FABRICATION_BASE64 } from '../assets/images/steelComponentFabricationBase64';
import { STEEL_PLANTS_BASE64 } from '../assets/images/steelPlantsBase64';
import { NEW_SR_INFRA_PLANT_SITE_BASE64 } from '../assets/images/newSrInfraPlantSiteBase64';
import { CEMENT_PLANTS_BASE64 } from '../assets/images/cementPlantsBase64';
import { STEEL_COLUMN_TRUSS_FABRICATION_BASE64 } from '../assets/images/steelColumnTrussFabricationBase64';
import { HEAVY_PLANT_FRAMEWORK_ERECTION_BASE64 } from '../assets/images/heavyPlantFrameworkErectionBase64';
import { GAS_CHEMICAL_PIPELINE_FABRICATION_BASE64 } from '../assets/images/gasChemicalPipelineFabricationBase64';
import { HIGH_PRESSURE_TRANSMISSION_PIPELINE_BASE64 } from '../assets/images/highPressureTransmissionPipelineBase64';
import { SUSTAINABLE_WASTE_MANAGEMENT_BASE64 } from '../assets/images/sustainableWasteManagementBase64';
import { THERMAL_POWER_PLANT_ELECTRIFICATION_BASE64 } from '../assets/images/thermalPowerPlantElectrificationBase64';
import { HSE_ZERO_INCIDENT_COMPLIANCE_BASE64 } from '../assets/images/hseZeroIncidentComplianceBase64';
import { INDUSTRIAL_ROOFTOP_SOLAR_PV_BASE64 } from '../assets/images/industrialRooftopSolarPvBase64';
import { ESP_FLUE_GAS_DUCTING_BASE64 } from '../assets/images/espFlueGasDuctingBase64';
import { INTEGRATED_STEEL_PLANT_HEAVY_FRAMING_BASE64 } from '../assets/images/integratedSteelPlantHeavyFramingBase64';
import { POLLUTION_PREVENTION_ESP_BASE64 } from '../assets/images/pollutionPreventionEspBase64';
import { PIPE_RACK_SUPPORT_STRUCTURE_BASE64 } from '../assets/images/pipeRackSupportStructureBase64';
import { GRIT_BLASTING_RED_OXIDE_BASE64 } from '../assets/images/gritBlastingRedOxideBase64';
import { INDUCTION_FURNACE_STEEL_MELT_SHOP_BASE64 } from '../assets/images/inductionFurnaceSteelMeltShopBase64';
import { COPPER_SMELTER_NON_FERROUS_BASE64 } from '../assets/images/copperSmelterNonFerrousBase64';
import { PLANT_HT_LT_SUBSTATION_BASE64 } from '../assets/images/plantHtLtSubstationBase64';
import { PALLET_PLANTS_PELLETIZATION_BASE64 } from '../assets/images/palletPlantsPelletizationBase64';
import { STRUCTURAL_FABRICATION_ERECTION_BASE64 } from '../assets/images/structuralFabricationErectionBase64';
import { INDUSTRIAL_PROCESS_ENGINEERING_PLANT_BASE64 } from '../assets/images/industrialProcessEngineeringPlantBase64';
import { SUGAR_MILLS_BIO_ETHANOL_BASE64 } from '../assets/images/sugarMillsBioEthanolBase64';
import { PROCESS_UTILITY_PLANTS_BASE64 } from '../assets/images/processUtilityPlantsBase64';
import { BOILER_BASE64 } from '../assets/images/boilerBase64';

export const PLACEHOLDERS = {
  address: 'Plot No.102, F/F, Patel Chamber, Opp. Jay Residency Gandhidham(Kutch) Gujarat.',
  registeredAddress: 'Plot No.295, Sector 7, G.F. 02, Gandhidham(Kutch) Gujarat.',
  corporateAddress: 'Plot No.102, F/F, Patel Chamber, Opp. Jay Residency Gandhidham(Kutch) Gujarat.',
  phone: '(+91) 9898 241 068',
  secondaryPhone: '(+91) 9129 325 506',
  email: 'info@srgroupone.com',
  projectEmail: 'project@srgroupone.com',
  accountEmail: 'account@srgroupone.com',
  billingEmail: 'bill@srgroupone.com',
  purchaseEmail: 'purchase@srgroupone.com',
  careersEmail: 'info@srgroupone.com',
  departmentEmails: [
    { department: 'General & Head Office', email: 'info@srgroupone.com', desc: 'General correspondence, corporate inquiries & group management', badge: 'HQ' },
    { department: 'Projects & Tenders', email: 'project@srgroupone.com', desc: 'Project tenders, technical submittals, turnkey contracts & site execution', badge: 'PROJECTS' },
    { department: 'Accounts & Finance', email: 'account@srgroupone.com', desc: 'Accounts management, ledger records & financial statements', badge: 'ACCOUNTS' },
    { department: 'Billing & Invoicing', email: 'bill@srgroupone.com', desc: 'Tax invoices, client billing, GST filing & payment documentation', badge: 'BILLING' },
    { department: 'Procurement & Purchase', email: 'purchase@srgroupone.com', desc: 'Raw material procurement, vendor proposals & purchase orders', badge: 'PURCHASE' },
  ],
  whatsappNumber: '919898241068',
  openingHours: {
    weekdays: 'Mon-Fri: 9 am – 6 pm',
    saturday: 'Saturday: 9 am – 4 pm',
    sunday: 'Sunday: Closed',
  },
};

export const COMPANIES_DATA: Record<string, CompanyProfile> = {
  'sr-group': {
    id: 'sr-group',
    name: 'SR GROUP',
    tagline: 'Engineering Excellence. Building Industries. Powering Progress.',
    category: 'Multi-Disciplinary Industrial Engineering Group',
    shortDesc: 'Integrated solutions across infrastructure, heavy structural fabrication, erection, process plant works, and power solutions.',
    fullDesc: 'SR GROUP is a multi-disciplinary industrial engineering group providing integrated solutions across infrastructure, engineering, fabrication, erection, process plants, and power-related projects. The group brings together specialized companies with complementary capabilities to support industrial clients from project execution to infrastructure and power solutions.',
    accentColor: '#f97316', // Industrial orange
    badge: 'SR GROUP OVERALL',
    services: [
      'Structural Fabrication & Erection',
      'Industrial Pipeline Works (Gas, Water, Chemical)',
      'Power Plant Boiler Works & Overhaul',
      'Process Plant Engineering (Sponge Iron, Cement, Power, Ferro Alloys)',
      'HT / LT Power Distribution & Electrical Systems',
      'Pollution Prevention & Environmental Systems',
      'Plant Maintenance, Red Oxide & Protective Coating'
    ],
    keyHighlights: [
      'Integrated Multi-Company Industrial Execution',
      'Strict Adherence to Quality & Site Safety',
      'Experienced Project Management Teams',
      'Full Life-Cycle Industrial Plant Support'
    ],
    heroImage: SR_GROUP_HERO_BASE64,
    primaryPhone: PLACEHOLDERS.phone,
    primaryEmail: PLACEHOLDERS.email,
    secondaryEmail: PLACEHOLDERS.projectEmail,
    projectEmail: PLACEHOLDERS.projectEmail,
    accountEmail: PLACEHOLDERS.accountEmail,
    billingEmail: PLACEHOLDERS.billingEmail,
    purchaseEmail: PLACEHOLDERS.purchaseEmail,
    departmentEmails: PLACEHOLDERS.departmentEmails,
    officeLocation: PLACEHOLDERS.address,
    overview: 'SR GROUP unites three specialized industrial entities—NEW SR INFRA, SUHEL ENGINEERING, and SR POWER SOLUTION—delivering end-to-end execution across heavy industrial sectors throughout India.'
  },
  'sr-infra': {
    id: 'sr-infra',
    name: 'NEW SR INFRA',
    tagline: 'Industrial Infrastructure, Heavy Structural Fabrication & Process Plant Solutions',
    category: 'Industrial Infrastructure, Fabrication & Plant Engineering',
    shortDesc: 'Specializing in structural steel fabrication, site erection, industrial pipelines (gas, water, chemical), process plants, and environmental engineering.',
    fullDesc: 'NEW SR INFRA (newsrinfra.com) provides complete industrial engineering, heavy structural steel fabrication and precision site erection, industrial pipeline networks, process plant turnkey works, pollution control systems, and protective coating services. Built on rigorous engineering standards and established industrial expertise, NEW SR INFRA delivers durable infrastructure and turnkey mechanical installation across India.',
    accentColor: '#2563eb', // Blue
    badge: 'COMPANY 01',
    services: [
      'Structural Fabrication & Erection',
      'Pipeline Services (Gas, Water & Chemical)',
      'Power Plant Boiler Works & Overhaul',
      'Sponge Iron Plants (DRI)',
      'Power Plants (Thermal & Captive)',
      'Ferro Alloys Furnaces',
      'Cement Plants',
      'Induction Furnaces',
      'Rolling Mills',
      'Pallet Plants (Pellet Plants)',
      'Copper Smelters',
      'Sugar Mills & Bio-Ethanol',
      'Pollution Prevention Systems',
      'Red Oxide & Color Coating (Miscellaneous Services)'
    ],
    keyHighlights: [
      'Heavy Structural Steel Fabrication & Precision Crane Erection',
      'Industrial Gas, Water & Chemical Process Pipeline Networks',
      'Turnkey Mechanical Engineering for Heavy Process Plants',
      'High-Efficiency Pollution Control Systems (ESP & Bag Filters)',
      'Grit Blasting, Red Oxide & Protective Industrial Paint Application'
    ],
    heroImage: NEW_SR_INFRA_HERO_BASE64,
    primaryPhone: '+91 98982 41068',
    secondaryPhone: '+91 99780 18354',
    primaryEmail: 'admin@newsrinfra.com',
    secondaryEmail: 'project@newsrinfra.com',
    website: 'www.newsrinfra.com',
    gstin: '24CTGPR1641K1ZJ',
    officeLocation: 'Plot No.295, Sector 7, G.F. 02, Gandhidham, Gujarat, 370 201.',
    overview: 'NEW SR INFRA (newsrinfra.com) is dedicated to constructing heavy industrial frameworks, structural sheds, utility pipeline networks, plant equipment infrastructure, and pollution control systems with safety and structural integrity at its core.'
  },
  'suhel-engineering': {
    id: 'suhel-engineering',
    name: 'SUHEL ENGINEERING',
    tagline: 'Industrial Engineering & Specialized Fabrication',
    category: 'Industrial Engineering & Process Plant Fabrication',
    shortDesc: 'Integrated industrial engineering, plant fabrication, specialized piping, furnace works, equipment installation, and shutdown maintenance.',
    fullDesc: 'Suhel Engineering provides integrated industrial engineering, fabrication, erection and plant execution services for diverse industrial sectors. The company focuses on safe execution, quality workmanship and dependable project delivery across complex process plants including Sponge Iron, Ferro Alloys, Power, Cement, Rolling Mills, and Sugar Mills.',
    accentColor: '#ea580c', // Darker Amber / Orange
    badge: 'COMPANY 02',
    services: [
      'Structural Fabrication & Erection',
      'Industrial Fabrication',
      'Pipeline Fabrication & Installation (Gas, Water, Chemical)',
      'Sponge Iron Plant Works',
      'Ferro Alloys Plant Works',
      'Power Plant Mechanical Works',
      'Power Plant Boiler Works & Overhaul',
      'Induction Furnace Works',
      'Cement Plant Works',
      'Rolling Mill Works',
      'Pellet Plant Works',
      'Copper Smelter Works',
      'Sugar Mill Works',
      'Pollution Prevention System Works',
      'Plant Maintenance & Shutdown Works',
      'Equipment Installation & Dismantling'
    ],
    keyHighlights: [
      'Specialized Mechanical Execution for Heavy Process Plants',
      'High Precision Industrial & Chemical Pipeline Erection',
      'Pollution Prevention System Fabrication & Assembly',
      'Expertise in Plant Shutdowns & Emergency Overhauls'
    ],
    heroImage: SUHEL_ENGINEERING_HERO_BASE64,
    primaryPhone: '+91 63863 17157',
    secondaryPhone: '+91 91293 25506',
    primaryEmail: 'suhelengineering7@rediffmail.com',
    gstin: '19BXVPA8671E1ZY',
    vendorCode: '10001847-Suhel Engineering',
    officeLocation: 'Firdous Nagar G T Road Neamatpur 123/38N, Asansol, Paschim Bardhaman, West Bengal - 713359',
    overview: 'SUHEL ENGINEERING provides full-spectrum mechanical fabrication, specialized process piping, furnace structural installation, and plant overhaul services with strict adherence to industrial standards.'
  },
  'sr-power-solution': {
    id: 'sr-power-solution',
    name: 'SR POWER SOLUTION',
    tagline: 'Power & Electrical Engineering Solutions',
    category: 'Power & Electrical Engineering Solutions',
    shortDesc: 'Complete HT/LT electrical installations, power distribution, panels, cable management, industrial solar, and plant electrification.',
    fullDesc: 'SR POWER SOLUTION provides reliable electrical, power and industrial energy solutions for commercial, infrastructure and industrial applications. From HT/LT power distribution systems and transformer setups to industrial electrification, solar installation, and power testing, we power industrial performance.',
    accentColor: '#10b981', // Emerald green / Power
    badge: 'COMPANY 03',
    services: [
      'LT & HT Electrical Installation',
      'HT / LT Panels, MCC & PCC Panels',
      'Industrial Power Distribution & Cable Laying',
      'Transformer Installation Support & Earthing',
      'Power Plant Electrical Support & Shutdowns',
      'Industrial Solar & Rooftop Power Solutions',
      'Electrical Testing, Preventive & Breakdown Maintenance'
    ],
    keyHighlights: [
      'HT / LT Industrial Power Installations',
      'PCC & MCC Control Panel Assemblies',
      'Industrial Solar Power & Energy Optimization',
      'Testing, Calibration & Preventive Maintenance'
    ],
    heroImage: SR_POWER_SOLUTION_HERO_BASE64,
    primaryPhone: '+91 91293 25506',
    secondaryPhone: '+91 99780 18354',
    primaryEmail: 'power@srgroup.com',
    gstin: '19BXVPA8671E2ZX',
    officeLocation: '12N, Seetalpur, P.O:- Disergarh SO, P.S:- Kulti, District :- Paschim Bardhaman, Pincode :- 713333',
    overview: 'SR POWER SOLUTION executes turnkey electrical engineering works, power distribution setups, control panels, transformer integrations, and industrial solar installations for heavy plants and infrastructure projects.'
  }
};

export const SR_INFRA_SERVICES: DetailedServiceItem[] = [
  {
    id: 'sr-infra-structural',
    slug: 'structural-fabrication-erection',
    title: 'Structural Fabrication & Erection',
    companyId: 'sr-infra',
    category: 'Steel Infrastructure',
    shortDesc: 'Assembly of steel components into frames on-site using precision bolting, site welding, column alignment, industrial sheds, and heavy structures.',
    fullDesc: 'NEW SR INFRA specializes in structural fabrication and site erection for heavy manufacturing complexes, industrial sheds, PEB buildings, platforms, and conveyor gantries. Our field teams execute precise column alignments, high-strength bolting, full-penetration welding, and crane-assisted heavy lifting with zero-incident safety protocols conforming to IS 800 and AWS D1.1 codes.',
    image: STRUCTURAL_FABRICATION_ERECTION_BASE64,
    iconName: 'Building2',
    scope: [
      'Heavy structural steel column & rafter fabrication',
      'Site erection, crane rigging & structural alignment',
      'Industrial sheds & Pre-Engineered Buildings (PEB)',
      'Equipment support structures, walkways & staircases',
      'Pipe racks, cable bridge gantries & conveyor towers'
    ],
    keyHighlights: [
      'Monthly structural capacity exceeding 1000+ Metric Tons',
      '100% Ultrasonic & Radiographic NDT weld inspection',
      'Laser-guided column verticality and elevation alignment'
    ],
    specs: [
      { label: 'Execution Codes', value: 'IS 800, IS 2062, AWS D1.1' },
      { label: 'Joining Methods', value: 'Torque-Controlled Bolting & SAW/SMAW Welding' },
      { label: 'Quality Verification', value: '100% NDT Testing & Laser Alignment' }
    ]
  },
  {
    id: 'sr-infra-pipeline',
    slug: 'pipeline-services',
    title: 'Pipeline Services (Gas, Water & Chemical)',
    companyId: 'sr-infra',
    category: 'Piping Engineering',
    shortDesc: 'Fabrication, fit-up, certified 6G welding, hydro-testing, and anti-corrosive coating for high-pressure gas, water, and chemical transmission lines.',
    fullDesc: 'We provide end-to-end industrial pipeline engineering covering gas pipelines, raw and treated water networks, effluent discharge lines, and chemical process piping. Our qualified IBR and 6G certified welders deliver leak-proof high-pressure lines with radiographic testing, hydrostatic pressure verification, and protective wrapping/painting.',
    image: GAS_CHEMICAL_PIPELINE_FABRICATION_BASE64,
    iconName: 'Pipette',
    scope: [
      'Industrial gas pipeline fabrication & route installation',
      'High-pressure chemical & acid distribution lines',
      'Plant process water, cooling circuits & effluent piping',
      'Pipeline support structure & pipe bridge fabrication',
      'Hydrostatic & pneumatic leak testing up to 100+ bar'
    ],
    keyHighlights: [
      'IBR and ASME Section IX certified pipe welders',
      'Complete radiography (RT) and dye-penetrant (DP) testing',
      'Anti-corrosion tape wrapping and polyurethane coating'
    ],
    specs: [
      { label: 'Materials', value: 'Carbon Steel (CS), Stainless Steel (SS 304/316), HDPE' },
      { label: 'Pressure Rating', value: 'Up to Class 300 / 600 High Pressure' },
      { label: 'Welding Standards', value: 'ASME B31.3 & IBR Regulations' }
    ]
  },
  {
    id: 'sr-infra-sponge-iron',
    slug: 'sponge-iron-plants',
    title: 'Sponge Iron Plants (DRI Works)',
    companyId: 'sr-infra',
    category: 'Process Metallurgy',
    shortDesc: 'Complete mechanical erection and maintenance for Direct Reduced Iron (DRI) rotary kilns, coolers, coal injection systems, and WHRB ducting.',
    fullDesc: 'Expertise in Sponge Iron (Direct Reduced Iron - DRI) manufacturing facilities utilizing gas and coal-based reduction technologies. We carry out rotary kiln shell assembly, tyre alignment, drive unit fitting, cooler fabrication, coal thrower setup, waste heat recovery boiler (WHRB) ducting, and turnaround shutdown services.',
    image: SPONGE_IRON_PLANT_BASE64,
    iconName: 'Flame',
    scope: [
      'Rotary kiln shell fabrication, positioning & tyre alignment',
      'Rotary cooler mechanical erection & internal lifters',
      'Coal handling, iron ore feed chutes & conveyor structures',
      'WHRB ducting, settling chambers & after-burning chambers',
      'Scheduled turnaround overhauls and emergency shutdown works'
    ],
    keyHighlights: [
      'Proven expertise in 100 TPD, 350 TPD & 500 TPD DRI Kilns',
      'High-temperature refractory anchoring & casing fabrication',
      '24/7 dedicated shutdown mechanical crews'
    ],
    specs: [
      { label: 'Plant Type', value: 'Coal-Based & Gas-Based DRI Plants' },
      { label: 'Equipment Handled', value: 'Rotary Kiln, Cooler, WHRB Ducting, Baghouse' },
      { label: 'Services', value: 'Greenfield Installation & Turnaround Overhauls' }
    ]
  },
  {
    id: 'sr-infra-power-plants',
    slug: 'power-plants',
    title: 'Power Plants (Thermal & Captive)',
    companyId: 'sr-infra',
    category: 'Energy & Power',
    shortDesc: 'Heavy boiler structural erection, high-pressure steam piping, turbine hall framing, cooling tower structures, and power plant shutdowns.',
    fullDesc: 'Comprehensive mechanical execution for thermal power plants, captive co-generation units, and waste-to-energy complexes. From boiler support structural steel erection and steam header piping to turbine auxiliary mechanical systems, ESP ducting, and coal handling gantries.',
    image: POWER_PLANT_BASE64,
    iconName: 'Zap',
    scope: [
      'Boiler structural steel framing & buckstay installation',
      'High-pressure main steam, hot reheat & feed water lines',
      'Turbine hall crane beams & equipment support platforms',
      'Coal handling plant (CHP) conveyor gantries & transfer towers',
      'Cooling water recirculation line fabrication & testing'
    ],
    keyHighlights: [
      'Experience in 10MW to 150MW+ Captive & Thermal units',
      'Strict adherence to Indian Boiler Regulations (IBR)',
      'Precision turbine alignment and vibration baseline audits'
    ],
    specs: [
      { label: 'Capacity Scope', value: 'Captive, Co-generation & Thermal Power' },
      { label: 'Piping Standards', value: 'IBR / ASME B31.1 Power Piping' },
      { label: 'Structures', value: 'Heavy Boilers, Deaerator & Bunker Structures' }
    ]
  },
  {
    id: 'sr-infra-power-plant-boiler',
    slug: 'power-plant-boiler',
    title: 'Power Plant Boiler Works & Overhaul',
    companyId: 'sr-infra',
    category: 'Energy & Power',
    shortDesc: 'Boiler erection & installation, maintenance & shutdowns, pressure parts & tube replacement, drum, header, superheater, economizer, and auxiliary works.',
    fullDesc: 'Dedicated industrial boiler engineering division specializing in turnkey boiler erection, pressure parts repair, and planned turnaround maintenance. We handle water wall tube replacement, superheater coils, economizers, steam drums, structural support framing, ducting, and air pre-heaters with certified IBR welders and strict radiographic testing.',
    image: BOILER_BASE64,
    iconName: 'Flame',
    scope: [
      'Boiler Erection & Installation',
      'Boiler Maintenance & Shutdown',
      'Pressure Parts & Tube Replacement',
      'Drum, Header, Superheater & Economizer Work',
      'Steam & Utility Piping',
      'Boiler Structure & Platform Fabrication',
      'Ducting & Expansion Joint Work',
      'FD/ID/PA Fan Maintenance',
      'Pump, Valve & Equipment Maintenance',
      'Ash & Coal Handling System Work',
      'Insulation & Refractory Work',
      'Testing, Commissioning & Overhauling'
    ],
    keyHighlights: [
      'Certified IBR High-Pressure Welders & Radiography Inspection',
      'Comprehensive 24/7 emergency breakdown and annual shutdown crew',
      'Turnkey mechanical execution for AFBC, CFBC, WHRB & Utility boilers'
    ],
    specs: [
      { label: 'Boiler Types', value: 'Thermal Power Boilers, WHRB, AFBC, CFBC, Stoker' },
      { label: 'Regulatory Standards', value: 'Indian Boiler Regulations (IBR 1950)' },
      { label: 'Critical Assemblies', value: 'Drums, Superheaters, Economizers, Air Preheaters' }
    ]
  },
  {
    id: 'sr-infra-ferro-alloys',
    slug: 'ferro-alloys-furnaces',
    title: 'Ferro Alloys Furnaces (SAF Works)',
    companyId: 'sr-infra',
    category: 'Smelting & Furnaces',
    shortDesc: 'Submerged Arc Furnace (SAF) structural fabrication, electrode column assembly, high-temperature busbar support, and tapping floor engineering.',
    fullDesc: 'Specialized fabrication and erection for Ferro Alloys smelting furnaces, including Ferro Chrome, Ferro Manganese, and Silico Manganese plants. We fabricate furnace shells, water-cooled smoke hoods, electrode regulation structures, tapping spouts, and high-amperage bus tube support assemblies.',
    image: FERRO_ALLOYS_BASE64,
    iconName: 'Layers',
    scope: [
      'Submerged Arc Furnace (SAF) shell & hearth steel fabrication',
      'Water-cooled roof hoods, charging pipes & gas seal hoods',
      'Electrode column guide frames, mantle & clamping rings',
      'Tapping floor structural steel, ladle transfer cars & tracks',
      'Fume extraction ducting and gas cleaning plant structures'
    ],
    keyHighlights: [
      'High-heat resistant alloy structural steel fabrication',
      'Heavy copper/aluminum busbar support framing',
      'Precision electrode alignment and stroke testing'
    ],
    specs: [
      { label: 'Furnace Types', value: 'Submerged Arc Furnaces (SAF) 6 MVA to 33 MVA' },
      { label: 'Alloys Produced', value: 'FeCr, FeMn, SiMn, FeSi Plants' },
      { label: 'Specialty', value: 'Water-Cooled Structural Hoods & Tapping Platforms' }
    ]
  },
  {
    id: 'sr-infra-cement-plants',
    slug: 'cement-plants',
    title: 'Cement Plants Machinery & Ducting',
    companyId: 'sr-infra',
    category: 'Heavy Process Plant',
    shortDesc: 'Preheater towers, rotary kilns, clinker coolers, raw & cement mill structural framing, and heavy gas ducting networks.',
    fullDesc: 'Full turnkey structural steel erection and mechanical equipment assembly for modern dry-process cement plants. Capabilities include multi-stage cyclone preheater steel structures, tertiary air ducts (TAD), kiln burner platforms, clinker cooler mechanicals, vertical roller mills (VRM), and baghouse filters.',
    image: CEMENT_PLANTS_BASE64,
    iconName: 'Wrench',
    scope: [
      'Preheater tower structural steel fabrication & heavy erection',
      'Tertiary Air Duct (TAD), cyclone ducting & expansion joints',
      'Clinker cooler mechanical installation & casing erection',
      'Raw material conveyor galleries, transfer chutes & silos',
      'Cement mill & coal mill auxiliary structural supports'
    ],
    keyHighlights: [
      'Heavy structural steel towers up to 100+ meters height',
      'High wear-resistant plate lining & ducting fabrication',
      'Turnaround shutdown support for kiln and cooler maintenance'
    ],
    specs: [
      { label: 'Plant Sections', value: 'Preheater, Kiln, Cooler, VRM, Cement Mill' },
      { label: 'Structural Steel', value: 'High Tensile Structural Sections & Wear Plates' },
      { label: 'Ducting Range', value: 'Large Diameter Insulated Hot Gas Ducting' }
    ]
  },
  {
    id: 'sr-infra-induction-furnace',
    slug: 'induction-furnaces',
    title: 'Induction Furnaces & Steel Melt Shops',
    companyId: 'sr-infra',
    category: 'Steel Melting',
    shortDesc: 'Furnace deck steel fabrication, water-cooled coil piping, tilting cylinder framing, capacitor bank racks, and fume extraction hoods.',
    fullDesc: 'Turnkey structural and piping solutions for medium and high-frequency induction melting furnaces in steel melt shops and foundries. We construct furnace charging platforms, hydraulic tilting cradles, water cooling manifold circuits, capacitor bank framing, and side-draft fume extraction systems.',
    image: INDUCTION_FURNACE_STEEL_MELT_SHOP_BASE64,
    iconName: 'ShieldCheck',
    scope: [
      'Furnace operating deck & charging platform structural steel',
      'Hydraulic tilting cylinder base frames & ladle car tracks',
      'Stainless steel / brass water cooling manifold pipe networks',
      'Capacitor rack structures, busway & transformer enclosures',
      'Fume extraction swivel hoods & high-temp ducting'
    ],
    keyHighlights: [
      'Non-magnetic structural steel fabrication near induction coils',
      'High-pressure leak-tested cooling water circuits',
      'Fast turnaround installation for foundry melt shops'
    ],
    specs: [
      { label: 'Furnace Ratings', value: '5 Tons to 50 Tons Steel Induction Melting' },
      { label: 'Cooling Circuits', value: 'Stainless Steel & High-Temp Flexible Hosing' },
      { label: 'Fume Control', value: 'Telescopic & Swivel Extraction Hoods' }
    ]
  },
  {
    id: 'sr-infra-rolling-mills',
    slug: 'rolling-mills',
    title: 'Rolling Mills Equipment & Structural Erection',
    companyId: 'sr-infra',
    category: 'Steel Processing',
    shortDesc: 'Reheating furnace structures, roughing & finishing mill stand framing, cooling beds, runout roller tables, and loopers.',
    fullDesc: 'Mechanical setup, structural foundations, and equipment erection for hot rolling mills producing TMT re-bars, wire rods, structural channels, and angles. We execute reheating furnace steel fabrication, mill stand sole plate grouting, roller table positioning, cooling bed mechanisms, and automated bundling lines.',
    image: ROLLING_MILL_BASE64,
    iconName: 'Factory',
    scope: [
      'Pusher / Walking beam reheating furnace structural steel',
      'Mill stand sole plate leveling, anchoring & alignment',
      'Cooling bed mechanical erection, rake mechanisms & drives',
      'Flying shear, crop shear & pinch roll mechanical mounting',
      'Runout roller tables, loopers & automatic bundling lines'
    ],
    keyHighlights: [
      'Precision optical alignment of rolling mill centerline',
      'Heavy-duty foundation sole plates & vibration dampeners',
      'High-speed bar mill and wire rod block installation'
    ],
    specs: [
      { label: 'Mill Types', value: 'TMT Rebar Mills, Wire Rod, Section & Angle Mills' },
      { label: 'Alignment Tolerance', value: 'High Precision Optical & Laser Alignment' },
      { label: 'Turnaround', value: 'Modular Fast-Track Mill Modernization' }
    ]
  },
  {
    id: 'sr-infra-pallet-plants',
    slug: 'pallet-plants',
    title: 'Pallet Plants (Pelletization & Induration Grate)',
    companyId: 'sr-infra',
    category: 'Mineral Processing',
    shortDesc: 'Iron ore pelletization plant structures, traveling grate induration furnace framing, disc pelletizer piping, and scrubber systems.',
    fullDesc: 'Engineering and site erection for iron ore pellet plants and beneficiation units. We fabricate and erect traveling grate induration furnace structures, hood ducting, disc pelletizer platforms, thickener tanks, slurry piping, and heavy raw material conveyor networks.',
    image: PALLET_PLANTS_PELLETIZATION_BASE64,
    iconName: 'Boxes',
    scope: [
      'Traveling grate induration furnace structural casing & hoods',
      'Disc pelletizer & balling drum operating platforms',
      'Process water, bentonite slurry & slurry recycling piping',
      'Process gas fans, multi-cyclones & bag filter structural works',
      'Long-distance overland conveyor galleries & transfer towers'
    ],
    keyHighlights: [
      'Handling high-temperature process gas ducting and furnace hoods',
      'Specialized wear-resistant chute & bin fabrication',
      'Turnkey mechanical and piping integration'
    ],
    specs: [
      { label: 'Plant Capacity', value: '0.6 MTPA to 2.4 MTPA Pelletization Units' },
      { label: 'Induration Tech', value: 'Straight Grate & Grate-Kiln Systems' },
      { label: 'Piping', value: 'Heavy Slurry & High-Pressure Utility Lines' }
    ]
  },
  {
    id: 'sr-infra-copper-smelters',
    slug: 'copper-smelters',
    title: 'Copper Smelters & Non-Ferrous Plants',
    companyId: 'sr-infra',
    category: 'Non-Ferrous Metallurgy',
    shortDesc: 'Specialized acid-resistant chemical pipelines, copper converter structural frameworks, gas cleaning plants, and anode furnace works.',
    fullDesc: 'Advanced mechanical engineering for non-ferrous smelting complexes, primarily copper converters, flash furnaces, and acid plants. We specialize in acid-resistant stainless steel and alloy piping, gas cleaning plant (GCP) structures, electrostatic demister supports, and anode casting wheel mechanisms.',
    image: COPPER_SMELTER_NON_FERROUS_BASE64,
    iconName: 'Shield',
    scope: [
      'Copper converter & anode furnace structural frameworks',
      'High-grade stainless steel (316L, 904L) acid & chemical lines',
      'Gas cleaning plant (GCP) & wet electrostatic precipitator framing',
      'Ladle transfer cranes, matte settling furnace supports',
      'Heavy off-gas cooling ducting and neutralization systems'
    ],
    keyHighlights: [
      'Specialized exotic alloy and corrosion-resistant welding',
      'Strict environmental and toxic fume containment standards',
      'Robust structural engineering for high-temperature smelting'
    ],
    specs: [
      { label: 'Sectors', value: 'Copper, Zinc, Lead & Non-Ferrous Smelting' },
      { label: 'Piping Alloys', value: 'SS 316L, SS 904L, Titanium & FRP/GRP Lines' },
      { label: 'Safety', value: 'Hazardous Chemical & Acid Containment Standards' }
    ]
  },
  {
    id: 'sr-infra-sugar-mills',
    slug: 'sugar-mills',
    title: 'Sugar Mills & Cogeneration Plants',
    companyId: 'sr-infra',
    category: 'Agro & Process Industry',
    shortDesc: 'Cane carrier structures, juice extraction & evaporation piping, bagasse boiler mechanical works, and distillery expansion.',
    fullDesc: 'Turnkey fabrication, pipeline engineering, and equipment overhaul for sugar manufacturing factories and integrated bio-ethanol distilleries. We construct cane unloading gantries, juice clarification and multi-effect evaporator piping, bagasse boiler ducting, and power cogeneration turbine hall structures.',
    image: SUGAR_MILLS_BIO_ETHANOL_BASE64,
    iconName: 'Gauge',
    scope: [
      'Cane carrier gantries, feeder tables & shredder platforms',
      'Juice extraction, liming, sulphitation & evaporator piping',
      'Bagasse boiler casing, superheater & economizer ducting',
      'Turbine hall structural steel & steam extraction lines',
      'Off-season scheduled mill overhaul and maintenance'
    ],
    keyHighlights: [
      'High-speed off-season maintenance turnaround',
      'Food-grade and steam-certified process piping',
      'Complete mechanical and power integration'
    ],
    specs: [
      { label: 'Plant Capacity', value: '2500 TCD to 10000+ TCD Sugar Complexes' },
      { label: 'Steam Piping', value: 'IBR Certified High-Pressure Steam Piping' },
      { label: 'Maintenance', value: 'Seasonal Overhaul & Plant Modernization' }
    ]
  },
  {
    id: 'sr-infra-pollution-prevention',
    slug: 'pollution-prevention',
    title: 'Pollution Prevention Systems (ESP & Bag Filters)',
    companyId: 'sr-infra',
    category: 'Environmental Engineering',
    shortDesc: 'Electrostatic Precipitators (ESP), high-efficiency bag filter houses, venturi scrubbers, cyclone separators, and heavy flue gas ducting.',
    fullDesc: 'Environmental protection and industrial emission control systems for steel, cement, power, and chemical plants. We fabricate and erect heavy Electrostatic Precipitator (ESP) casings, collecting/emitting electrode frames, reverse-pulse bag filter structures, wet scrubbers, cyclone separators, and large-diameter chimney ducting networks.',
    image: POLLUTION_PREVENTION_ESP_BASE64,
    iconName: 'Leaf',
    scope: [
      'Electrostatic Precipitator (ESP) casing, hopper & internal frames',
      'Pulse-jet bag filter houses, tube sheets & cage assemblies',
      'Venturi scrubbers, gas cooling towers & cyclonic separators',
      'Large-diameter flue gas ducting, dampers & expansion joints',
      'Self-supporting & guyed industrial chimneys/stacks'
    ],
    keyHighlights: [
      'Compliance with National Ambient Air Quality (CPCB/SPCB) norms',
      'Heavy-gauge gas-tight structural fabrication and seam welding',
      'Corrosion and high-temperature resistant construction'
    ],
    specs: [
      { label: 'System Types', value: 'ESP, Baghouse Filters, Wet Scrubbers, Cyclones' },
      { label: 'Gas Volume', value: '50,000 m³/hr to 1,000,000+ m³/hr Airflow' },
      { label: 'Emission Standard', value: '< 30 mg/Nm³ Particulate Emission Compliance' }
    ]
  },
  {
    id: 'sr-infra-coating-finishing',
    slug: 'red-oxide-color-coating',
    title: 'Red Oxide, Industrial Color Coating & Finishing',
    companyId: 'sr-infra',
    category: 'Finishing & Maintenance',
    shortDesc: 'Surface preparation, automated sand/grit blasting, red oxide primer application, epoxy/polyurethane color coating, and plant shutdown services.',
    fullDesc: 'Professional surface treatment, corrosion protection, and protective coating services for all fabricated structural steel, pipeline spools, and plant machinery. We utilize abrasive grit/copper slag blasting to Sa 2.5 Swedish standards, applying high-build zinc phosphate/red oxide primers, epoxy barrier coats, and polyurethane (PU) weather-resistant topcoats.',
    image: GRIT_BLASTING_RED_OXIDE_BASE64,
    iconName: 'Paintbrush',
    scope: [
      'Abrasive grit blasting & sand blasting to Sa 2.5 standard',
      'Red oxide primer & zinc phosphate protective application',
      'High-build epoxy intermediate & Polyurethane (PU) topcoats',
      'Pipe internal/external anti-corrosive wrapping & coating',
      'Industrial plant repainting, structural touch-up & corrosion audits'
    ],
    keyHighlights: [
      'Dry Film Thickness (DFT) testing with calibrated digital gauges',
      'Salt spray resistant coating systems for coastal & chemical environments',
      'Airless spray equipment for uniform, blemish-free finish'
    ],
    specs: [
      { label: 'Surface Profile', value: 'Sa 2.5 / SSPC-SP 10 Grit Blasting' },
      { label: 'Coating Types', value: 'Red Oxide, Zinc Phosphate, Epoxy, PU, Heat Resistant' },
      { label: 'DFT Verification', value: 'Elcometer Magnetic / Digital Gauge Calibrated' }
    ]
  }
];

export const SERVICES_DATA: ServiceCategory[] = [
  {
    id: 'fabrication-erection',
    slug: 'fabrication-erection',
    title: 'Structural Fabrication & Erection',
    companyId: 'sr-infra',
    shortDesc: 'Precision heavy structural steel fabrication, plant sheds, platforms, pipe racks, walkways, and high-rise structural erection.',
    fullDesc: 'Our structural fabrication and erection division provides complete design-to-installation solutions for industrial structures. We operate advanced fabrication workshops and field erection teams capable of handling heavy steel girders, trusses, platforms, staircases, handrails, and industrial plant sheds with dimensional precision and site safety.',
    iconName: 'Building2',
    heroImage: STRUCTURAL_FABRICATION_ERECTION_BASE64,
    items: [
      'Structural steel fabrication',
      'Heavy structural fabrication',
      'Structural erection & site assembly',
      'Equipment support structures & gantries',
      'Pipe racks & cable bridge structures',
      'Platforms, walkways & staircases',
      'Handrails & safety enclosures',
      'Industrial sheds & pre-engineered buildings',
      'Steel plant structures & conveyor gantries',
      'Plant maintenance structures'
    ],
    processSteps: [
      { step: '01', title: 'Engineering & Planning', desc: 'Detailing shop drawings, load analysis, and erection planning.' },
      { step: '02', title: 'Material Procurement', desc: 'Sourcing certified steel sections, plates, and tested consumables.' },
      { step: '03', title: 'Fabrication', desc: 'Precision cutting, beveling, tacking, full-penetration welding, and shop fitting.' },
      { step: '04', title: 'Quality Inspection', desc: 'NDT testing, dimensional check, grit blasting, and protective coating.' },
      { step: '05', title: 'Transportation & Logistics', desc: 'Safe dispatch of fabricated structural components to site.' },
      { step: '06', title: 'Site Erection', desc: 'Controlled crane lifting, bolt torquing, alignment, and site welding.' },
      { step: '07', title: 'Alignment & Testing', desc: 'Precision laser alignment, verticality verification, and torque audit.' },
      { step: '08', title: 'Final Handover', desc: 'Client sign-off, as-built documentation, and safety compliance hand-over.' }
    ],
    specifications: [
      { label: 'Capabilities', value: 'Light, Medium & Heavy Structural Fabrication' },
      { label: 'Standards', value: 'IS 800, IS 2062, AWS D1.1 Welding Standards' },
      { label: 'Testing', value: 'Ultrasonic (UT), Radiography (RT), Magnetic Particle (MPT), DP' }
    ]
  },
  {
    id: 'pipeline-services',
    slug: 'pipeline',
    title: 'Industrial Pipeline Services',
    companyId: 'suhel-engineering',
    shortDesc: 'Fabrication, installation, and hydro-testing of industrial gas, water, chemical, utility, and process pipelines.',
    fullDesc: 'We execute complete pipeline engineering including fabrication, field welding, alignment, support installation, hydro-testing, and protective coating for process industries. Our capabilities cover high-pressure gas, water supply, chemical fluids, steam, and utility networks across steel, chemical, power, and manufacturing plants.',
    iconName: 'Pipette',
    heroImage: '/images/pipeline-1.jpg',
    items: [
      'Gas Pipeline Fabrication & Installation',
      'Water & Effluent Pipeline Networks',
      'Chemical & Acid Line Installation',
      'High Pressure Industrial Utility Lines',
      'Steam & Compressed Air Piping',
      'Pipeline Support Structure Fabrication',
      'Hydro-testing & Pneumatic Testing Support',
      'Surface Preparation, Painting & Anti-Corrosion Coating'
    ],
    processSteps: [
      { step: '01', title: 'Isometrics & Layout', desc: 'Reviewing line drawings, pipe routing, and valve placement schedules.' },
      { step: '02', title: 'Pipe Prep & Fit-Up', desc: 'Precision beveling, pipe cutting, root gap fit-up, and purging setup.' },
      { step: '03', title: 'Welding Execution', desc: 'TIG / SMAW welding by certified high-pressure pipe welders.' },
      { step: '04', title: 'NDT & Inspection', desc: '100% Visual and Radiographic / Ultrasonic NDT examination.' },
      { step: '05', title: 'Hydro Testing', desc: 'Controlled hydrostatic pressure testing with record documentation.' },
      { step: '06', title: 'Coating & Insulation', desc: 'Primer application, top coat, anti-corrosive wrapping, or thermal insulation.' }
    ],
    specifications: [
      { label: 'Materials', value: 'Carbon Steel (CS), Stainless Steel (SS), Alloy Steel, HDPE' },
      { label: 'Welder Certs', value: 'IBR / 6G Certified Welders' },
      { label: 'Pressure Range', value: 'Low, Medium & Ultra-High Pressure Applications' }
    ]
  },
  {
    id: 'industrial-engineering',
    slug: 'industrial-engineering',
    title: 'Industrial Process Engineering & Plant Works',
    companyId: 'suhel-engineering',
    shortDesc: 'Turnkey plant execution, equipment installation, furnace works, pollution prevention systems, plant overhauls, and shutdown works.',
    fullDesc: 'Specialized mechanical and process plant engineering tailored for heavy manufacturing industries. We handle mechanical equipment erection, rotary kilns, induction furnaces, rolling mills, pellet plants, pollution prevention systems (ESP, Bag filters), and emergency plant shutdown maintenance.',
    iconName: 'Wrench',
    heroImage: INDUSTRIAL_PROCESS_ENGINEERING_PLANT_BASE64,
    items: [
      'Sponge Iron Plant Mechanical Works',
      'Ferro Alloys Furnace Structures & Equipment',
      'Induction Furnace Installation & Lining Support',
      'Cement Plant Machinery & Ducting',
      'Rolling Mill Equipment Alignment',
      'Pellet Plant & Copper Smelter Mechanical Installation',
      'Sugar Mill Processing Machinery Works',
      'Pollution Prevention System (ESP / Bag Filters / Scrubbers)',
      'Plant Equipment Overhauls & Shutdown Works',
      'Equipment Dismantling & Relocation'
    ],
    processSteps: [
      { step: '01', title: 'Shutdown Planning', desc: 'Detailed time-charting, manpower mobilization, and crane scheduling.' },
      { step: '02', title: 'Equipment Inspection', desc: 'Pre-dismantling inspection, matching marks, and clearance checks.' },
      { step: '03', title: 'Precision Installation', desc: 'Heavy rigging, optical level alignment, and precision shim setting.' },
      { step: '04', title: 'Commissioning Support', desc: 'No-load trial runs, vibration monitoring, and operational handoff.' }
    ],
    specifications: [
      { label: 'Sectors', value: 'Steel, Sponge Iron, Power, Cement, Sugar, Non-Ferrous' },
      { label: 'Services', value: 'Greenfield Projects, Expansion, Shutdown Maintenance' },
      { label: 'Safety', value: '100% Zero-Incident Protocol & Permit to Work' }
    ]
  },
  {
    id: 'power-solutions',
    slug: 'power-solutions',
    title: 'Power & Electrical Engineering Solutions',
    companyId: 'sr-power-solution',
    shortDesc: 'Turnkey HT/LT electrical installation, power panels, cable management, industrial solar, earthing, and plant electrical maintenance.',
    fullDesc: 'SR POWER SOLUTION delivers comprehensive industrial electrical engineering services. From high-voltage substations and transformer installations to PCC/MCC panel deployment, industrial wiring, earthing, plant lighting, and solar energy systems, we provide safe, high-availability power infrastructure.',
    iconName: 'Zap',
    heroImage: '/images/power-plant-1.jpg',
    items: [
      'LT & HT Electrical Installation Works',
      'PCC Panels, MCC Panels & Control Desk Installation',
      'Distribution Boards & Busbar Trunking Systems',
      'Transformer Erection, Oil Testing & Bushing Support',
      'Industrial Power Cabling, Cable Tray & Termination',
      'Earthing Grid Systems & Lightning Protection',
      'Industrial Lighting & Emergency Backup Systems',
      'Power Plant Electrical Installation & Cable Management',
      'Industrial Solar Solutions & Rooftop Power Integrations',
      'Electrical Testing, Thermography & Preventive Maintenance'
    ],
    processSteps: [
      { step: '01', title: 'Electrical Design Audit', desc: 'SLD verification, cable sizing, and load calculation reviews.' },
      { step: '02', title: 'Tray & Earthing Grid', desc: 'Cable tray routing, ladder support installation, and earthing pit creation.' },
      { step: '03', title: 'Panel & Transformer Erection', desc: 'Positioning, busduct coupling, and control cable glanding.' },
      { step: '04', title: 'Cable Laying & Termination', desc: 'HT/LT cable pulling, heat-shrink termination, and megger testing.' },
      { step: '05', title: 'Testing & Commissioning', desc: 'Relay testing, insulation resistance check, Phase sequence, and energized handshake.' }
    ],
    specifications: [
      { label: 'Voltage Range', value: 'Low Voltage (LT) to High Voltage (HT) up to 33kV/132kV' },
      { label: 'Panels', value: 'Type-Tested PCC, MCC, APFC, VFD & Automation Panels' },
      { label: 'Green Energy', value: 'Industrial Rooftop & On-Grid Solar PV Integrations' }
    ]
  },
  {
    id: 'power-plant-boiler',
    slug: 'power-plant-boiler',
    title: 'Power Plant Boiler Works & Overhaul',
    companyId: 'suhel-engineering',
    shortDesc: 'Boiler erection & installation, maintenance shutdowns, pressure parts & tube replacement, drum, header, superheater, economizer, ducting, and overhaul works.',
    fullDesc: 'Specialized high-pressure boiler mechanical engineering, erection, maintenance, and turnaround shutdowns for thermal, captive, and cogeneration power plants. We execute precision tube replacement, drum and header alignment, superheater and economizer installation, IBR steam piping, ducting, expansion joints, and rotating equipment overhaul conforming to strict safety and IBR regulations.',
    iconName: 'Flame',
    heroImage: BOILER_BASE64,
    items: [
      'Boiler Erection & Installation',
      'Boiler Maintenance & Shutdown',
      'Pressure Parts & Tube Replacement',
      'Drum, Header, Superheater & Economizer Work',
      'Steam & Utility Piping',
      'Boiler Structure & Platform Fabrication',
      'Ducting & Expansion Joint Work',
      'FD/ID/PA Fan Maintenance',
      'Pump, Valve & Equipment Maintenance',
      'Ash & Coal Handling System Work',
      'Insulation & Refractory Work',
      'Testing, Commissioning & Overhauling'
    ],
    processSteps: [
      { step: '01', title: 'Inspection & Thickness Survey', desc: 'Pre-shutdown ultrasonic thickness audit, tube condition assessment, and NDT planning.' },
      { step: '02', title: 'Pressure Parts & Tube Replacement', desc: 'Tube extraction, precision root fit-up, certified IBR TIG/SMAW welding, and radiographic testing.' },
      { step: '03', title: 'Drum, Header & Steam Piping', desc: 'Header alignment, superheater/economizer tube bundle replacement, and high-pressure steam line fabrication.' },
      { step: '04', title: 'Ducting, Fans & Auxiliary Equipment', desc: 'Expansion joint fitting, flue gas ducting repair, and FD/ID/PA fan balancing and overhaul.' },
      { step: '05', title: 'Refractory & Thermal Insulation', desc: 'Boiler castable refractory application, ceramic wool insulation, and GI/aluminum cladding.' },
      { step: '06', title: 'Hydrostatic Test & Commissioning', desc: 'IBR inspector witnessed hydrostatic pressure testing, light-up trial, steam blowing, and performance handover.' }
    ],
    specifications: [
      { label: 'Boiler Types', value: 'AFBC, CFBC, Pulverized Coal, WHRB (Waste Heat Recovery), Biomass & Stoker Boilers' },
      { label: 'Regulatory Code', value: 'Indian Boiler Regulations (IBR 1950) & ASME Section I' },
      { label: 'Capabilities', value: 'Turnkey Erection, Annual Overhaul, Emergency Breakdown Tube Repairs' }
    ]
  }
];

export const INDUSTRIES_SERVED: IndustrySector[] = [
  {
    id: 'steel-plants',
    title: 'Steel Plants',
    shortDesc: 'Structural steel framing, blast furnace support, hot rolling mill fabrication, and heavy utility pipelines.',
    fullDesc: 'We provide heavy structural fabrication, crane gantry erection, raw material handling structures, gas pipelines, and high-temperature furnace mechanical installations for integrated steel plants.',
    image: STEEL_PLANTS_BASE64,
    gallery: [
      STEEL_PLANTS_BASE64,
      STEEL_PLANTS_BASE64
    ],
    relevantCompanies: ['sr-infra', 'suhel-engineering', 'sr-power-solution'],
    keyServices: ['Heavy Structural Erection', 'Gas & Water Pipeline', 'Plant Maintenance']
  },
  {
    id: 'sponge-iron-plants',
    title: 'Sponge Iron Plants',
    shortDesc: 'Rotary kiln mechanical works, cooler structures, coal handling, ESP ducting, and shutdown overhaul.',
    fullDesc: 'Comprehensive execution for Direct Reduced Iron (DRI) plants including kiln structural supports, waste heat recovery boiler ducting, bag filter pollution control, and electrical automation.',
    image: SPONGE_IRON_PLANT_BASE64,
    gallery: [
      SPONGE_IRON_PLANT_BASE64,
      '/images/sponge-iron-plant-2.jpg'
    ],
    relevantCompanies: ['sr-infra', 'suhel-engineering', 'sr-power-solution'],
    keyServices: ['Kiln Mechanical Works', 'ESP Ducting', 'MCC Panel Setup']
  },
  {
    id: 'ferro-alloys',
    title: 'Ferro Alloys',
    shortDesc: 'Submerged arc furnace structural fabrication, electrode assembly support, and transformer electrification.',
    fullDesc: 'Specialized fabrication and electrical distribution for SAF / Ferro Chrome / Ferro Manganese plants, focusing on high heat resistance and heavy power handling.',
    image: FERRO_ALLOYS_BASE64,
    gallery: [
      FERRO_ALLOYS_BASE64,
      FERRO_ALLOYS_BASE64
    ],
    relevantCompanies: ['sr-infra', 'suhel-engineering', 'sr-power-solution'],
    keyServices: ['Furnace Structural Works', 'HT Transformer Installation', 'High Current Busbars']
  },
  {
    id: 'power-plants',
    title: 'Power Plants',
    shortDesc: 'Boiler structural erection, high-pressure steam piping, HT electrical switchyards, and solar extensions.',
    fullDesc: 'Execution of thermal, captive, and renewable power infrastructure, covering coal handling gantries, steam lines, turbine electrification, sub-station switchyards, and solar systems.',
    image: POWER_PLANT_BASE64,
    gallery: [
      POWER_PLANT_BASE64,
      POWER_PLANT_BASE64,
      POWER_PLANT_BASE64
    ],
    relevantCompanies: ['sr-infra', 'suhel-engineering', 'sr-power-solution'],
    keyServices: ['Steam Piping', 'Substation Switchyard', 'Solar Electrical Integration']
  },
  {
    id: 'cement-plants',
    title: 'Cement Plants',
    shortDesc: 'Pre-heater tower fabrication, clinker cooler ducting, cement mill piping, and heavy power distribution.',
    fullDesc: 'Turnkey structural erection and power distribution for cement manufacturing lines, limestone crushers, vertical roller mills, and high-efficiency baghouse filters.',
    image: CEMENT_PLANTS_BASE64,
    gallery: [
      CEMENT_PLANTS_BASE64,
      CEMENT_PLANTS_BASE64
    ],
    relevantCompanies: ['sr-infra', 'suhel-engineering', 'sr-power-solution'],
    keyServices: ['Pre-heater Tower Steel', 'Heavy Utility Piping', 'LT/HT Power Laying']
  },
  {
    id: 'rolling-mills',
    title: 'Rolling Mills',
    shortDesc: 'Reheating furnace structural works, mill stand foundation structures, and motor drive panel wiring.',
    fullDesc: 'Mechanical setup and electrical drive installations for TMR bar mills, wire rod mills, section mills, and continuous casting machine extensions.',
    image: ROLLING_MILL_BASE64,
    gallery: [
      ROLLING_MILL_BASE64
    ],
    relevantCompanies: ['sr-infra', 'suhel-engineering', 'sr-power-solution'],
    keyServices: ['Reheating Furnace Steel', 'VFD / Motor Wiring', 'Cooling Bed Piping']
  },
  {
    id: 'pellet-plants',
    title: 'Pellet Plants',
    shortDesc: 'Induration furnace steel structures, disc pelletizer piping, and plant power distribution.',
    fullDesc: 'Specialized fabrication and piping for iron ore pelletization facilities, raw material conveyor gantries, and central control room electrification.',
    image: PALLET_PLANTS_PELLETIZATION_BASE64,
    relevantCompanies: ['sr-infra', 'suhel-engineering'],
    keyServices: ['Conveyor Structures', 'Process Water Lines', 'MCC Panels']
  },
  {
    id: 'induction-furnace',
    title: 'Induction Furnace Units',
    shortDesc: 'Furnace deck steel structures, water-cooled cable piping, and transformer power busway works.',
    fullDesc: 'Steel melt shop infrastructure including furnace platforms, water cooling jacket piping, capacitor bank cabling, and pollution fume extraction hoods.',
    image: INDUCTION_FURNACE_STEEL_MELT_SHOP_BASE64,
    relevantCompanies: ['sr-infra', 'suhel-engineering', 'sr-power-solution'],
    keyServices: ['Furnace Platforms', 'Cooling Water Piping', 'Capacitor Bank Electrification']
  },
  {
    id: 'copper-smelters',
    title: 'Copper Smelters',
    shortDesc: 'Acid resistant piping, heavy copper converter structures, and HT electrical cabling.',
    fullDesc: 'Non-ferrous smelter plant engineering, specialized chemical line fabrication, gas cleaning plant erection, and high-capacity electrical distribution.',
    image: COPPER_SMELTER_NON_FERROUS_BASE64,
    relevantCompanies: ['sr-infra', 'suhel-engineering', 'sr-power-solution'],
    keyServices: ['Chemical Piping', 'Heavy Smelter Steel', 'HT Power Cabling']
  },
  {
    id: 'sugar-mills',
    title: 'Sugar Mills & Bio-Ethanol',
    shortDesc: 'Cane carrier structures, juice piping, boiler installation, and cogeneration plant electrification.',
    fullDesc: 'Seasonal plant overhauls, bagasse handling structures, steam piping networks, and electrical power generation cabling for sugar and bio-fuel complexes.',
    image: SUGAR_MILLS_BIO_ETHANOL_BASE64,
    relevantCompanies: ['suhel-engineering', 'sr-power-solution'],
    keyServices: ['Juice & Steam Lines', 'Boiler Structures', 'Generator Electrification']
  },
  {
    id: 'chemical-industries',
    title: 'Chemical & Process Industries',
    shortDesc: 'SS chemical pipelines, storage tank supports, flameproof electrical wiring, and earthing.',
    fullDesc: 'High-integrity stainless steel piping, anti-corrosive structural supports, intrinsically safe hazardous area electrical installations, and emergency earthing grids.',
    image: '/images/pipeline-1.jpg',
    relevantCompanies: ['sr-infra', 'suhel-engineering', 'sr-power-solution'],
    keyServices: ['SS Chemical Piping', 'Flameproof Electrification', 'Hazardous Earthing']
  },
  {
    id: 'infrastructure-projects',
    title: 'Infrastructure Projects',
    shortDesc: 'Flyover structural steel, industrial bridges, utility cable trays, and municipal power distribution.',
    fullDesc: 'Public and industrial infrastructure works including structural steel bridge gantries, underground utility ducting, street lighting, and heavy cable trenching.',
    image: '/images/erection-gallery-1.jpg',
    relevantCompanies: ['sr-infra', 'sr-power-solution'],
    keyServices: ['Heavy Steel Bridges', 'Cable Trenching', 'Outdoor Power Distribution']
  },
  {
    id: 'manufacturing-industries',
    title: 'Manufacturing Plants',
    shortDesc: 'Factory shed fabrication, crane gantries, machine power wiring, and rooftop solar.',
    fullDesc: 'Factory construction, heavy overhead crane runway beams, compressed air lines, busduct power distribution, and green energy solar integration.',
    image: '/images/pipe-rack-fabrication.jpg',
    relevantCompanies: ['sr-infra', 'sr-power-solution'],
    keyServices: ['Pre-Engineered Factory Sheds', 'Machine Power Wiring', 'Rooftop Solar PV']
  },
  {
    id: 'industrial-warehouses',
    title: 'Industrial Logistics & Warehouses',
    shortDesc: 'Large span PEB warehouse sheds, mezzanine floor structures, and high-bay LED electrification.',
    fullDesc: 'Wide-span structural steel logistics parks, heavy loading dock platforms, sprinkler line piping, and energy-efficient warehouse lighting.',
    image: '/images/steel-plant-1.jpg',
    relevantCompanies: ['sr-infra', 'sr-power-solution'],
    keyServices: ['Wide Span PEB Sheds', 'Sprinkler Utility Lines', 'High-Bay Lighting']
  },
  {
    id: 'process-industries',
    title: 'Process & Utility Plants',
    shortDesc: 'Water treatment plant piping, effluent treatment structures, and SCADA control panel electrification.',
    fullDesc: 'Utility piping, pump house mechanical fabrication, aeration tank pipe racks, and automated electrical control panel integration.',
    image: PROCESS_UTILITY_PLANTS_BASE64,
    relevantCompanies: ['suhel-engineering', 'sr-power-solution'],
    keyServices: ['Pump House Piping', 'Aeration Tank Steel', 'SCADA Control Cabling']
  }
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'proj-sr-boiler-01',
    title: 'High-Pressure Captive Power Plant Boiler & WHRB Overhaul',
    companyId: 'sr-infra',
    companyName: 'NEW SR INFRA',
    industry: 'Boiler & Thermal Power Systems',
    location: 'Hazira / Gujarat, India',
    scopeOfWork: 'WHRB boiler erection, water wall panel tube replacement, superheater coils, drum alignment, ducting, and IBR hydro-testing.',
    completionStatus: 'Completed',
    image: BOILER_BASE64,
    description: 'Turnkey boiler mechanical shutdown and overhaul executed in record 21-day turnaround with certified IBR welders, 100% radiographic weld quality, and hydro-testing approval.'
  },
  {
    id: 'proj-boiler-01',
    title: 'Thermal Power Plant Boiler Works & Overhaul Turnaround',
    companyId: 'suhel-engineering',
    companyName: 'SUHEL ENGINEERING',
    industry: 'Power Generation & Boiler Systems',
    location: 'Thermal Power Station / India',
    scopeOfWork: 'Boiler pressure parts & tube replacement, drum & header alignment, superheater coil revamp, IBR steam piping, and turnaround overhaul.',
    completionStatus: 'Completed',
    image: BOILER_BASE64,
    description: 'Executed complete turnkey annual boiler overhaul and high-pressure parts replacement under IBR 1950 supervision with 100% radiographic weld testing, zero defect hydro-testing, and on-time plant light-up.'
  },
  {
    id: 'proj-01',
    title: 'Heavy Structural Steel Fabrication & Erection Project',
    companyId: 'sr-infra',
    companyName: 'NEW SR INFRA',
    industry: 'Steel & Heavy Infrastructure',
    location: 'Gandhidham / Gujarat, India',
    scopeOfWork: 'Fabrication and site erection of main plant structural steel, crane gantries, walkways, staircases, and heavy roof trusses.',
    completionStatus: 'Completed',
    image: STEEL_PLANTS_BASE64,
    description: 'Executed high-precision structural steel fabrication adhering to IS 800 standards with 100% Ultrasonic NDT testing and zero-delay erection scheduling.'
  },
  {
    id: 'proj-sr-02',
    title: 'Industrial Gas & Water Process Pipeline Installation',
    companyId: 'sr-infra',
    companyName: 'NEW SR INFRA',
    industry: 'Process & Petrochemical',
    location: 'Dahej / Gujarat, India',
    scopeOfWork: 'Complete detail engineering, pipe fit-up, certified 6G welding, support structure fabrication, and hydro-testing for high-pressure lines.',
    completionStatus: 'Completed',
    image: GAS_CHEMICAL_PIPELINE_FABRICATION_BASE64,
    description: 'Executed over 12 kilometers of high-pressure carbon steel and stainless steel pipeline with 100% radiographic weld quality compliance.'
  },
  {
    id: 'proj-sr-03',
    title: '500 TPD Sponge Iron Plant Kiln & Mechanical Erection',
    companyId: 'sr-infra',
    companyName: 'NEW SR INFRA',
    industry: 'Sponge Iron & DRI Metallurgy',
    location: 'Kutch / Gujarat, India',
    scopeOfWork: 'Kiln shell assembly, tyre alignment, cooler fabrication, WHRB ducting, and turnaround mechanical shutdown execution.',
    completionStatus: 'Completed',
    image: SPONGE_IRON_PLANT_BASE64,
    description: 'Full mechanical erection of rotary kiln and cooler with precision optical level alignment and round-the-clock site engineering.'
  },
  {
    id: 'proj-sr-04',
    title: 'Cement Plant Preheater Tower & Ducting Erection',
    companyId: 'sr-infra',
    companyName: 'NEW SR INFRA',
    industry: 'Cement Manufacturing',
    location: 'Rajasthan, India',
    scopeOfWork: 'Fabrication and heavy crane erection of multi-stage preheater steel tower, Tertiary Air Duct (TAD), and clinker cooler casing.',
    completionStatus: 'Completed',
    image: CEMENT_PLANTS_BASE64,
    description: 'High-altitude structural erection using 250T heavy crawler cranes conforming strictly to AWS D1.1 and site safety mandates.'
  },
  {
    id: 'proj-sr-05',
    title: 'High-Efficiency Electrostatic Precipitator (ESP) & Bag Filter System',
    companyId: 'sr-infra',
    companyName: 'NEW SR INFRA',
    industry: 'Environmental & Pollution Control',
    location: 'Odisha, India',
    scopeOfWork: 'Fabrication and erection of ESP casings, collecting electrode rapping frames, pulse-jet baghouse filters, and chimney ducting.',
    completionStatus: 'Turnkey',
    image: '/images/environmental-pollution-prevention-esp.jpg',
    description: 'Delivered customized pollution control systems designed to meet stringent CPCB emission standards (< 30 mg/Nm³).'
  },
  {
    id: 'proj-sr-06',
    title: 'Hot Rolling Mill Stand Foundations & Cooling Bed Mechanics',
    companyId: 'sr-infra',
    companyName: 'NEW SR INFRA',
    industry: 'Steel Re-Rolling Mills',
    location: 'Raipur / Chhattisgarh, India',
    scopeOfWork: 'Reheating furnace steel, mill stand sole plate grouting, roller table positioning, and cooling bed mechanical assembly.',
    completionStatus: 'Completed',
    image: ROLLING_MILL_BASE64,
    description: 'Precision alignment of 18-stand continuous bar mill with high-speed shear mounting and automated cooling bed handover.'
  },
  {
    id: 'proj-sr-07',
    title: 'Ferro Alloys Submerged Arc Furnace (SAF) Fabrication & Erection',
    companyId: 'sr-infra',
    companyName: 'NEW SR INFRA',
    industry: 'Ferro Alloys & Smelting',
    location: 'Odisha / Andhra Pradesh, India',
    scopeOfWork: 'Submerged Arc Furnace (SAF) shell fabrication, electrode column assembly, high-temperature busbar support, and tapping floor engineering.',
    completionStatus: 'Completed',
    image: FERRO_ALLOYS_BASE64,
    description: 'Comprehensive mechanical fabrication and high-precision erection for multi-MVA Submerged Arc Furnaces with zero-defect quality.'
  },
  {
    id: 'proj-02',
    title: 'High-Pressure Industrial Gas & Water Pipeline Network',
    companyId: 'suhel-engineering',
    companyName: 'SUHEL ENGINEERING',
    industry: 'Process Industry',
    location: '[PLANT SITE, INDIA]',
    scopeOfWork: 'Complete detail engineering, pipe fit-up, TIG/ARC welding, support structure fabrication, and hydro-testing for 12-bar utility lines.',
    completionStatus: 'Completed',
    image: '/images/pipeline-1.jpg',
    description: 'Laid over 15 kilometers of carbon steel and stainless steel process piping with 100% radiographic weld quality compliance.'
  },
  {
    id: 'proj-03',
    title: 'Plant HT/LT Substation & Electrical Distribution Installation',
    companyId: 'sr-power-solution',
    companyName: 'SR POWER SOLUTION',
    industry: 'Power & Infrastructure',
    location: '[INDUSTRIAL PARK, INDIA]',
    scopeOfWork: 'Installation of 33kV Transformers, PCC Panels, MCC Panels, heavy power cabling, earthing grid, and plant electrification.',
    completionStatus: 'Completed',
    image: PLANT_HT_LT_SUBSTATION_BASE64,
    description: 'Turnkey HT/LT electrical engineering completed ahead of schedule, with comprehensive relay calibration and safety audit sign-off.'
  },
  {
    id: 'proj-04',
    title: 'Sponge Iron Plant Kiln & Mechanical Overhaul Project',
    companyId: 'suhel-engineering',
    companyName: 'SUHEL ENGINEERING',
    industry: 'Sponge Iron & Metals',
    location: '[METALLURGICAL COMPLEX, INDIA]',
    scopeOfWork: 'Kiln shell alignment, cooler replacement, ducting erection, bag house filter overhaul, and emergency shutdown execution.',
    completionStatus: 'Completed',
    image: SPONGE_IRON_PLANT_BASE64,
    description: 'Successfully performed emergency plant shutdown mechanical maintenance with 24/7 dedicated engineering crews.'
  },
  {
    id: 'proj-05',
    title: 'Industrial Rooftop Solar & Energy Efficient Distribution',
    companyId: 'sr-power-solution',
    companyName: 'SR POWER SOLUTION',
    industry: 'Renewable Power',
    location: '[MANUFACTURING HUB, INDIA]',
    scopeOfWork: 'Design and installation of rooftop solar mounting structures, DC power cabling, inverter integration, and LT panel coupling.',
    completionStatus: 'Ongoing',
    image: INDUSTRIAL_ROOFTOP_SOLAR_PV_BASE64,
    description: 'Integrating high-efficiency solar energy into plant power grids to reduce carbon footprint and lower operational energy expenses.'
  },
  {
    id: 'proj-06',
    title: 'Pollution Prevention & ESP Ducting Fabrication Project',
    companyId: 'suhel-engineering',
    companyName: 'SUHEL ENGINEERING',
    industry: 'Cement & Power',
    location: '[PLANT ZONE, INDIA]',
    scopeOfWork: 'Fabrication and erection of large diameter flue gas ducting, expansion joints, hopper steel, and ESP casing structures.',
    completionStatus: 'Turnkey',
    image: ESP_FLUE_GAS_DUCTING_BASE64,
    description: 'Delivered customized pollution prevention structural units designed to withstand high temperatures and abrasive industrial dusts.'
  }
];

export const GALLERY_DATA: GalleryItem[] = [
  {
    id: 'gal-boiler-01',
    title: 'Power Plant Boiler Works & Overhaul Site Execution',
    category: 'PLANT',
    companyId: 'suhel-engineering',
    image: BOILER_BASE64,
    caption: 'Power plant boiler erection & shutdown overhaul, IBR pressure parts replacement, superheater coils, drum alignment, and high-pressure steam line fabrication.'
  },
  {
    id: 'gal-suhel-hero',
    title: 'SUHEL ENGINEERING Process Piping & Mechanical Erection Site',
    category: 'PIPELINE',
    companyId: 'suhel-engineering',
    image: SUHEL_PIPING_SITE_BASE64,
    caption: 'SUHEL ENGINEERING on-site heavy mechanical execution, industrial process pipeline installation, and plant structural works.'
  },
  {
    id: 'gal-srinfra-hero',
    title: 'NEW SR INFRA Industrial Plant Site & Structural Execution',
    category: 'PLANT',
    companyId: 'sr-infra',
    image: NEW_SR_INFRA_PLANT_SITE_BASE64,
    caption: 'NEW SR INFRA on-site industrial project execution, structural fabrication, piping integration, and plant infrastructure development.'
  },
  {
    id: 'gal-srgroup-01',
    title: 'SR GROUP Construction Site Steel Framing & Crane Assembly',
    category: 'ERECTION',
    companyId: 'sr-group',
    image: SR_GROUP_CRANE_ERECTION_BASE64,
    caption: 'SR GROUP comprehensive site execution featuring heavy mobile and tower cranes assembling massive structural steel frameworks.'
  },
  {
    id: 'gal-sr-structural-fab-erection',
    title: 'Structural Fabrication & Erection',
    category: 'FABRICATION',
    companyId: 'sr-infra',
    image: STRUCTURAL_FABRICATION_ERECTION_BASE64,
    caption: 'Precision heavy structural steel fabrication, plant sheds, platforms, pipe racks, walkways, and high-rise structural erection.'
  },
  {
    id: 'gal-01',
    title: 'Heavy Structural Steel Framing & Workshop Assembly',
    category: 'FABRICATION',
    companyId: 'sr-infra',
    image: STEEL_PLANTS_BASE64,
    caption: 'NEW SR INFRA precision fabrication of heavy steel girders, trusses, and columns inside our workshop.'
  },
  {
    id: 'gal-fab-02',
    title: 'Heavy Industrial Steel Component Fabrication & Fit-up',
    category: 'FABRICATION',
    companyId: 'sr-infra',
    image: STEEL_COMPONENT_FABRICATION_BASE64,
    caption: 'Precision cutting, fit-up, full penetration welding, and structural steel component fabrication in our yard.'
  },
  {
    id: 'gal-fab-03',
    title: 'Structural Steel Column & Truss Fabrication Work',
    category: 'FABRICATION',
    companyId: 'sr-infra',
    image: STEEL_COLUMN_TRUSS_FABRICATION_BASE64,
    caption: 'Shop floor structural fabrication, plate joining, high-precision drilling, and quality weld inspections.'
  },
  {
    id: 'gal-02',
    title: 'High-Altitude Structural Steel Crane Erection',
    category: 'ERECTION',
    companyId: 'sr-infra',
    image: SR_GROUP_CRANE_ERECTION_BASE64,
    caption: 'Controlled heavy crane lifting, column alignment, and high-altitude truss erection at industrial site by NEW SR INFRA.'
  },
  {
    id: 'gal-erect-02',
    title: 'Heavy Industrial Plant Structural Steel Framework Erection',
    category: 'ERECTION',
    companyId: 'sr-infra',
    image: HEAVY_PLANT_FRAMEWORK_ERECTION_BASE64,
    caption: 'Tandem crane lift, high-altitude beam bolting, column verticality alignment, and plant structural framework erection.'
  },
  {
    id: 'gal-sr-05',
    title: 'Cement Plant Preheater Tower & Heavy Structural Erection',
    category: 'ERECTION',
    companyId: 'sr-infra',
    image: CEMENT_PLANTS_BASE64,
    caption: 'NEW SR INFRA multi-tier cyclone preheater tower, ducting network, and heavy kiln structural erection.'
  },
  {
    id: 'gal-cement-02',
    title: 'Cement Manufacturing Plant Kiln & Structural Assembly',
    category: 'PLANT',
    companyId: 'sr-infra',
    image: CEMENT_PLANTS_BASE64,
    caption: 'Turnkey structural erection, tertiary air duct (TAD) installation, clinker cooler framing, and raw mill mechanical fit-up.'
  },
  {
    id: 'gal-sr-03',
    title: 'Industrial Gas & Chemical Pipeline Fabrication',
    category: 'PIPELINE',
    companyId: 'sr-infra',
    image: GAS_CHEMICAL_PIPELINE_FABRICATION_BASE64,
    caption: 'NEW SR INFRA high-pressure pipeline fit-up, certified 6G welding, and hydrostatic pressure testing.'
  },
  {
    id: 'gal-pipe-02',
    title: 'High-Pressure Transmission Pipeline Route & Support Fit-Up',
    category: 'PIPELINE',
    companyId: 'sr-infra',
    image: HIGH_PRESSURE_TRANSMISSION_PIPELINE_BASE64,
    caption: 'Precision beveling, pipe alignment, certified argon root welding, and hydro-testing of industrial transmission lines.'
  },
  {
    id: 'gal-04',
    title: 'HT Panel Termination & Substation Setup',
    category: 'POWER',
    companyId: 'sr-power-solution',
    image: PLANT_HT_LT_SUBSTATION_BASE64,
    caption: 'Installation of high-voltage PCC control panels, substation equipment, and heavy power busbars.'
  },
  {
    id: 'gal-power-02',
    title: 'Thermal & Captive Power Plant Electrification',
    category: 'POWER',
    companyId: 'sr-power-solution',
    image: THERMAL_POWER_PLANT_ELECTRIFICATION_BASE64,
    caption: 'Heavy transformer installation, cable tray routing, switchgear synchronization, and captive power plant cabling.'
  },
  {
    id: 'gal-power-03',
    title: 'Power Plant Boiler & Structural Mechanical Erection',
    category: 'POWER',
    companyId: 'sr-infra',
    image: POWER_PLANT_BASE64,
    caption: 'Heavy boiler support structural erection, high-pressure steam header integration, and thermal power plant mechanical fit-up.'
  },
  {
    id: 'gal-06',
    title: 'Site Safety Briefing & Daily Toolbox Talk',
    category: 'SAFETY',
    companyId: 'sr-group',
    image: HSE_ZERO_INCIDENT_COMPLIANCE_BASE64,
    caption: 'Pre-shift safety protocol briefing, mandatory PPE compliance inspection, and hazard risk mitigation review across SR Group sites.'
  },
  {
    id: 'gal-safe-02',
    title: 'HSE Zero Incident Compliance & Site Safety Inspection',
    category: 'SAFETY',
    companyId: 'sr-infra',
    image: HSE_ZERO_INCIDENT_COMPLIANCE_BASE64,
    caption: 'Strict enforcement of Permit-to-Work (PTW) protocols, full-body safety harness audits, and industrial site hazard mitigation.'
  },
  {
    id: 'gal-steel-02',
    title: 'Integrated Steel Plant Heavy Framing & Structure Erection',
    category: 'PLANT',
    companyId: 'sr-infra',
    image: INTEGRATED_STEEL_PLANT_HEAVY_FRAMING_BASE64,
    caption: 'Heavy structural framing, crane girder erection, and high-altitude blast furnace support execution at integrated steel plant site.'
  },
  {
    id: 'gal-sr-04',
    title: 'Sponge Iron Rotary Kiln & Cooler Shell Erection',
    category: 'PLANT',
    companyId: 'sr-infra',
    image: SPONGE_IRON_PLANT_BASE64,
    caption: 'NEW SR INFRA mechanical erection of Direct Reduced Iron (DRI) kiln shell and rotary cooler.'
  },
  {
    id: 'gal-sr-04b',
    title: 'Ferro Alloys Submerged Arc Furnace (SAF) Shell Erection',
    category: 'PLANT',
    companyId: 'sr-infra',
    image: FERRO_ALLOYS_BASE64,
    caption: 'NEW SR INFRA fabrication & erection of Submerged Arc Furnace (SAF) shell, electrode regulation frame, and tapping platform.'
  },
  {
    id: 'gal-sr-04c',
    title: 'Ferro Alloys Heavy Smelting Furnace Structural Works',
    category: 'FABRICATION',
    companyId: 'sr-infra',
    image: FERRO_ALLOYS_BASE64,
    caption: 'High-temperature structural steel fabrication and water-cooled hood assembly for Ferro Alloys plant.'
  },
  {
    id: 'gal-sr-06',
    title: 'Hot Rolling Mill Machinery Alignment',
    category: 'PLANT',
    companyId: 'sr-infra',
    image: ROLLING_MILL_BASE64,
    caption: 'NEW SR INFRA mill stand sole plate leveling, optical centerline alignment, and cooling bed mechanical erection.'
  },
  {
    id: 'gal-05',
    title: 'Rotary Kiln Mechanical Alignment Work',
    category: 'PLANT',
    companyId: 'suhel-engineering',
    image: SPONGE_IRON_PLANT_BASE64,
    caption: 'Heavy equipment overhauling during scheduled industrial plant shutdown.'
  },
  {
    id: 'gal-03',
    title: 'High-Pressure Process Pipeline Alignment',
    category: 'PIPELINE',
    companyId: 'suhel-engineering',
    image: '/images/pipeline-1.jpg',
    caption: 'Certified 6G welding and hydro-testing fit-up for industrial chemical fluid line.'
  },
  {
    id: 'gal-sr-07',
    title: 'Pollution Control ESP & Flue Gas Ducting',
    category: 'FABRICATION',
    companyId: 'sr-infra',
    image: ESP_FLUE_GAS_DUCTING_BASE64,
    caption: 'NEW SR INFRA Electrostatic Precipitator (ESP) casing fabrication and industrial chimney erection.'
  },
  {
    id: 'gal-sr-08',
    title: 'Grit Blasting & Red Oxide Industrial Protective Coating',
    category: 'FABRICATION',
    companyId: 'sr-infra',
    image: GRIT_BLASTING_RED_OXIDE_BASE64,
    caption: 'NEW SR INFRA surface treatment to Sa 2.5 standard with red oxide primer and PU topcoat finishing.'
  },
  {
    id: 'gal-07',
    title: 'Pipe Rack Support Structure Fabrication',
    category: 'FABRICATION',
    companyId: 'suhel-engineering',
    image: PIPE_RACK_SUPPORT_STRUCTURE_BASE64,
    caption: 'Grit blasting and anti-corrosive primer coating on elevated pipe rack steel.'
  },
  {
    id: 'gal-08',
    title: 'Industrial Rooftop Solar PV Installation',
    category: 'POWER',
    companyId: 'sr-power-solution',
    image: INDUSTRIAL_ROOFTOP_SOLAR_PV_BASE64,
    caption: 'Deployment of industrial solar panels and DC power management array.'
  },
  {
    id: 'gal-sr-furnace',
    title: 'Induction Furnaces & Steel Melt Shops',
    category: 'PLANT',
    companyId: 'sr-infra',
    image: INDUCTION_FURNACE_STEEL_MELT_SHOP_BASE64,
    caption: 'NEW SR INFRA steel melting furnace deck structural fabrication, water cooling manifold circuits, and tilting cradle erection.'
  },
  {
    id: 'gal-sr-copper',
    title: 'Copper Smelters & Non-Ferrous Plants',
    category: 'PLANT',
    companyId: 'sr-infra',
    image: COPPER_SMELTER_NON_FERROUS_BASE64,
    caption: 'NEW SR INFRA non-ferrous copper converter structural frameworks, acid-resistant piping, and gas cleaning plant erection.'
  },
  {
    id: 'gal-sr-pollution-esp',
    title: 'Pollution Prevention Systems (ESP & Bag Filters)',
    category: 'PLANT',
    companyId: 'sr-infra',
    image: POLLUTION_PREVENTION_ESP_BASE64,
    caption: 'NEW SR INFRA high-efficiency Electrostatic Precipitator (ESP) casing, pulse-jet bag filter houses, and large-diameter flue gas ducting.'
  },
  {
    id: 'gal-sr-pallet-plants',
    title: 'Pallet Plants (Pelletization & Induration Grate)',
    category: 'PLANT',
    companyId: 'sr-infra',
    image: PALLET_PLANTS_PELLETIZATION_BASE64,
    caption: 'NEW SR INFRA iron ore pelletization plant induration furnace structures, disc pelletizer platforms, and slurry piping networks.'
  },
  {
    id: 'gal-suhel-industrial-process-engineering',
    title: 'Industrial Process Engineering & Plant Works',
    category: 'PLANT',
    companyId: 'suhel-engineering',
    image: INDUSTRIAL_PROCESS_ENGINEERING_PLANT_BASE64,
    caption: 'SUHEL ENGINEERING turnkey industrial process plant execution, rotary equipment installation, and heavy shutdown works.'
  },
  {
    id: 'gal-suhel-sugar-mills',
    title: 'Sugar Mills & Bio-Ethanol Processing Plant',
    category: 'PLANT',
    companyId: 'suhel-engineering',
    image: SUGAR_MILLS_BIO_ETHANOL_BASE64,
    caption: 'SUHEL ENGINEERING & SR POWER cane carrier structures, juice extraction piping, boiler installation, and cogeneration plant electrification.'
  },
  {
    id: 'gal-suhel-sr-power-process-utility',
    title: 'Process & Utility Plants (WTP & ETP Systems)',
    category: 'PLANT',
    companyId: 'suhel-engineering',
    image: PROCESS_UTILITY_PLANTS_BASE64,
    caption: 'SUHEL ENGINEERING & SR POWER water treatment plant piping, effluent treatment structures, and SCADA control panel electrification.'
  },
  {
    id: 'gal-sr-red-oxide',
    title: 'Red Oxide, Industrial Color Coating & Finishing',
    category: 'FABRICATION',
    companyId: 'sr-infra',
    image: '/images/red-oxide-industrial-coating.jpg',
    caption: 'NEW SR INFRA automated grit blasting to Sa 2.5 standard, red oxide primer application, and heavy-duty epoxy/PU industrial protective finish.'
  },
  {
    id: 'gal-sr-environment-sustainability',
    title: 'Sustainable Execution & Waste Management',
    category: 'SAFETY',
    companyId: 'sr-group',
    image: SUSTAINABLE_WASTE_MANAGEMENT_BASE64,
    caption: 'SR GROUP environmental sustainability practices: steel recycling, safe chemical disposal, and clean site management.'
  }
];

export const WORK_PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Requirement',
    desc: 'Understanding client project scope, engineering drawings, site conditions, and technical specifications.',
    icon: 'FileText'
  },
  {
    number: '02',
    title: 'Site Survey',
    desc: 'On-site technical inspection, topography checks, spatial measurements, and logistics planning.',
    icon: 'MapPin'
  },
  {
    number: '03',
    title: 'Engineering & Planning',
    desc: 'Detailed shop drafting, structural/electrical design review, and project schedule charting.',
    icon: 'Compass'
  },
  {
    number: '04',
    title: 'Resource Planning',
    desc: 'Procurement of certified raw steel, cables, machinery, specialized tools, and workforce mobilization.',
    icon: 'Boxes'
  },
  {
    number: '05',
    title: 'Fabrication',
    desc: 'Workshop cutting, machining, fit-up, certified welding, NDT testing, and anti-corrosion painting.',
    icon: 'Hammer'
  },
  {
    number: '06',
    title: 'Installation / Erection',
    desc: 'Controlled site rigging, crane erection, bolt torquing, pipeline alignment, and panel glanding.',
    icon: 'Wrench'
  },
  {
    number: '07',
    title: 'Inspection & Testing',
    desc: 'Hydro-static testing, insulation megger test, NDT audits, and dimensional verticality checks.',
    icon: 'CheckCircle2'
  },
  {
    number: '08',
    title: 'Project Handover',
    desc: 'Final site cleanup, commissioning assistance, as-built documentation submission, and client sign-off.',
    icon: 'Award'
  }
];

export const QUALITY_SAFETY_CARDS: QualitySafetyCard[] = [
  {
    title: 'QUALITY',
    subtitle: 'Precision Engineering & Material Standards',
    points: [
      'Comprehensive Quality Assurance Plan (QAP) for every project',
      '100% Raw material testing and mill certificate verification',
      'NDT methods: Radiographic (RT), Ultrasonic (UT), DP & Magnetic Particle',
      'Welder qualification as per AWS D1.1 and ASME Section IX standards',
      'Dimensional accuracy and verticality laser measurement audits'
    ],
    icon: 'ShieldCheck',
    image: STEEL_COLUMN_TRUSS_FABRICATION_BASE64
  },
  {
    title: 'SAFETY',
    subtitle: 'Zero Incident Culture & Site Protection',
    points: [
      'Strict adherence to OSHA & Indian Industrial Factory Safety rules',
      'Mandatory PPE (Helmets, Safety Harnesses, Steel-toe boots, High-Vis)',
      'Daily pre-shift Toolbox Talks and Job Safety Analysis (JSA)',
      'Permit to Work (PTW) system for Hot Work, Height Work & Confined Spaces',
      'Certified riggers, crane operators, and heavy lifting safety plans'
    ],
    icon: 'HardHat',
    image: HSE_ZERO_INCIDENT_COMPLIANCE_BASE64
  },
  {
    title: 'ENVIRONMENT',
    subtitle: 'Sustainable Execution & Waste Management',
    points: [
      'Responsible steel and scrap metal recycling protocols',
      'Safe disposal of industrial chemical solvents and spent welding flux',
      'Noise pollution mitigation during heavy structural fabrication',
      'Energy-efficient electrical equipment and solar PV integration',
      'Clean site management minimizing environmental ecological impact'
    ],
    icon: 'Leaf',
    image: SUSTAINABLE_WASTE_MANAGEMENT_BASE64
  }
];

export const WHY_CHOOSE_US: WhyChooseItem[] = [
  {
    title: 'Experienced Engineering Team',
    desc: 'Led by seasoned industrial engineers, site managers, certified pipe welders, and HT/LT electrical specialists.',
    icon: 'Users'
  },
  {
    title: 'Integrated Group Solutions',
    desc: 'One umbrella handling structural fabrication, site erection, process pipelines, and complete power distribution.',
    icon: 'Layers'
  },
  {
    title: 'Uncompromising Quality Workmanship',
    desc: 'High precision execution conforming to IS, ASME, AWS, and IEEE codes with full quality documentation.',
    icon: 'CheckCircle'
  },
  {
    title: 'Safety First Mindset',
    desc: 'A proactive safety culture with zero-incident goals, certified rigging, and strict work permit systems.',
    icon: 'Shield'
  },
  {
    title: 'Timely Project Completion',
    desc: 'Structured resource planning and responsive site mobilization to meet critical industrial deadlines.',
    icon: 'Clock'
  },
  {
    title: 'Long-term Customer Satisfaction',
    desc: 'Building enduring industrial partnerships through transparent communication, post-handover support, and integrity.',
    icon: 'Smile'
  }
];

export function getCompanyDisplayName(companyId?: string): string {
  if (!companyId) return 'SR GROUP';
  switch (companyId) {
    case 'sr-infra':
      return 'NEW SR INFRA';
    case 'suhel-engineering':
      return 'SUHEL ENGINEERING';
    case 'sr-power-solution':
      return 'SR POWER SOLUTION';
    case 'sr-group':
    default:
      return 'SR GROUP';
  }
}

