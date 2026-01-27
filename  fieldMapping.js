// ============================================================================
// SISTEMA DE MAPEO DE CAMPOS
// Capa de traducción entre nombres de Firebase y nombres del Excel
// ============================================================================

// MAPEO: "nombre_en_firebase": "Nombre en Excel"
export const FIELD_MAPPING = {
    "Item #": "Item #",
    "PPAP Part Number": "PPAP Part Number",
    "Component Description": "Component description",
    "Razon de Cambio": "Reason for Change",
    "Proceso": "Product type",
    "PRP5/area": "PRP5/Area",
    " OE/AFTERMARKET ": "OE/AFTERMARKET",
    "Se entrego documentacion": "documentation",
    "Muestras Recibidas": "Samples received",
    "Ubicacion Fisica ": "Location",
    "9-Dimensional results": "Dimensional",
    "Instrucciones Especiales": "Special instruccions",
    "Fecha de Programacion": "Validation date",
    "Programador": "Programmer",
    "Lider de Calidad": "Quality Lead",
    "Reason": "Reason",
    "Comments": "Comments(detalle)",
    "Responsable": "Responsible",
    "Estatus": "Estatus",
    "PPAP Type OE / SM AFTER Market": "PPAP type OE / SM After Market",
    "1-Design records": "1 Design records",
    "2-ECN document": "2 ECN document",
    "3-Customer eng approval": "3 Customer eng approval",
    "4-Design FMEA": "4 Design FMEA",
    "5-Process Flow Diagram": "5 Process Flow Diagram",
    "6-PFMEA": "6 PFMEA",
    "7-Control Plan": "7 Control Plan",
    "8-MSA Studies": "8 MSA Studies",
    "Dimensional results": "9 Dimensional results",
    "10-Material, performance test result": "10 Material, performance test result",
    "11-Initial Process Studies": "11 Initial Process Studies",
    "12-Qualify Lab Documentation": "12 Qualify Lab Documentation",
    "13-Appereance Approval Report": "13 Appereance Approval Report",
    "14-Sample product": "14 Sample product",
    "15-Checking Aids": "15 Checking Aids",
    "16-Record de compliance": "16 Record of compliance",
    "17-Bulk material checklist": "17 Bulk material checklist",
    "18-PSW(Full or Interim)": "18 PSW (Full or Interim)",
    "Supplier PPAP package status": "Supplier PPAP package status",
    "Validation run readiness": "Validation run readiness",
    "Samples on hand": "Samples on hand",
    "Dimension status": "Dimension status",
    "FFF review status": "FFF review status",
    "AAR review status": "AAR review status",
    "PPAP overall status": "PPAP overall status"
};

// ORDEN EXACTO DE LAS COLUMNAS (nombres de Firebase - NO CAMBIAR)
export const DB_FIELDS = [
    "Item #",
    "PPAP Part Number",
    "Component Description",
    "Razon de Cambio",
    "Proceso",
    "PRP5/area",
    " OE/AFTERMARKET ",
    "Se entrego documentacion",
    "Muestras Recibidas",
    "Ubicacion Fisica ",
    "9-Dimensional results",
    "Instrucciones Especiales",
    "Fecha de Programacion",
    "Programador",
    "Lider de Calidad",
    "Reason",
    "Comments",
    "Responsable",
    "Estatus",
    "PPAP Type OE / SM AFTER Market",
    "1-Design records",
    "2-ECN document",
    "3-Customer eng approval",
    "4-Design FMEA",
    "5-Process Flow Diagram",
    "6-PFMEA",
    "7-Control Plan",
    "8-MSA Studies",
    "Dimensional results",
    "10-Material, performance test result",
    "11-Initial Process Studies",
    "12-Qualify Lab Documentation",
    "13-Appereance Approval Report",
    "14-Sample product",
    "15-Checking Aids",
    "16-Record de compliance",
    "17-Bulk material checklist",
    "18-PSW(Full or Interim)",
    "Supplier PPAP package status",
    "Validation run readiness",
    "Samples on hand",
    "Dimension status",
    "FFF review status",
    "AAR review status",
    "PPAP overall status"
];

export function getVisualName(dbFieldName) {
    return FIELD_MAPPING[dbFieldName] || dbFieldName;
}

export function getDBName(visualName) {
    for (const [dbName, visName] of Object.entries(FIELD_MAPPING)) {
        if (visName === visualName) return dbName;
    }
    return visualName;
}

export function getVisualFields() {
    return DB_FIELDS.map(dbField => FIELD_MAPPING[dbField]);
}