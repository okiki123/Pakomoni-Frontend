import statesJson from "../static/states.json";
import categoriesJson from "../static/categories.json";
import titlesJson from "../static/titles.json";
import genderJson from "../static/genders.json";

const getStates = async () => {
    const states = statesJson.map(item => {
        return {value: item.state.name, label: item.state.name}
    })

    return Promise.resolve(states);
}

const getLGAs = async (stateName) => {
    const state = statesJson.find(item => {
        return item.state.name === stateName
    });

    if (!state) return [];

    let lgas = state.state.locals.map(item => {
        return {value: item.name, label: item.name}
    })

    return Promise.resolve(lgas);
}

const getCategories = async () => {
    const categories = categoriesJson.map(item => {
        return {label: item.categories, value: item.categories}
    })

    return Promise.resolve(categories)
}

const getSubCategories = async (categoryName) => {
    const category = categoriesJson.find(item => {
        return item.categories === categoryName
    })

    if (!category) return [];

    const subCategories = category.sub_categories.map(item => {
        return {value: item, label: item}
    })

    return Promise.resolve(subCategories);
}

const getTitles = async () => {
    return titlesJson;
}

const getGenders = async () => {
    return genderJson;
}

const StaticService = {
    getStates: getStates,
    getLGAs: getLGAs,
    getCategories: getCategories,
    getSubCategories: getSubCategories,
    getTitles: getTitles,
    getGenders: getGenders
}

export default StaticService;
