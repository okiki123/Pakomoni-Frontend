import localforage from "localforage";

localforage.config({
    name        : 'PakoMoni',
    version     : 1.0,
    storeName   : 'keyvaluepairs', // Should be alphanumeric, with underscores.
    description : 'PakoMoni Storage'
});

export default localforage;
