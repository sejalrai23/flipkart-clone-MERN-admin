import { CategoryConstants } from "../actions/constants"
const initState = {
  categories: [],
  loading: false,
  error: null

};

const buildNewCategory = (parentId, categories, category) => {
  let mycategories = [];
  console.log("checkk", categories);

  if (parentId == undefined) {
    return [
      ...categories,
      {
        _id: category._id,
        name: category.name,
        slug: category.slug,
        type: category.type,
        children: []
      }
    ];
  }

  for (let cat of categories) {

    if (cat._id == parentId) {
      const newCategory = {
        _id: category._id,
        name: category.name,
        slug: category.slug,
        parentId: category.parentId,
        type: category.type,
        children: []
      };
      mycategories.push({
        ...cat,
        children: cat.children.length > 0 ? [...cat.children, newCategory] : [newCategory]
      })
    } else {
      mycategories.push({
        ...cat,
        children: cat.children ? buildNewCategory(parentId, cat.children, category) : []
      });
    }
  }
  return mycategories;
}

export default (state = initState, action) => {
  switch (action.type) {
    case CategoryConstants.GET_CAT_SUCCESS:
      state = {
        ...state,
        categories: action.payload.categories
      }
      break;
    case CategoryConstants.ADD_NEW_CAT_REQUEST:
      state = {
        ...state,
        loading: true
      }
      break;
    case CategoryConstants.ADD_NEW_CAT_SUCCESS:
      const category = action.payload.category;
      const updatedCategories = buildNewCategory(category.parentId, state.categories, category)
      console.log("updated", updatedCategories);
      state = {
        ...state,
        categories: updatedCategories,
        loading: false,

      }
      break;
    case CategoryConstants.ADD_NEW_CAT_FAILURE:
      state = {
        ...initState,
        loading: false,
        error: action.payload.error
      }
      break;
    case CategoryConstants.UPDATE_CAT_REQUEST:
      state = {
        ...state,
        loading: true
    
      }
      break;
    case CategoryConstants.UPDATE_CAT_SUCCESS:
      state = {
        ...state,
        loading: false
      }
      break;
    case CategoryConstants.UPDATE_CAT_FAILURE:
      state = {
        ...state,
        loading:false,
        error: action.payload.error
      }
      break;
    case CategoryConstants.DELETE_CAT_REQUEST:
      state = {
        ...state,
        loading: true
      }
      break;
    case CategoryConstants.DELETE_CAT_SUCCESS:
      state = {
        ...state,
        loading: false
      }
      break;
    case CategoryConstants.DELETE_CAT_FAILURE:
      state = {
        ...state,
        loading:false,
        error: action.payload.error
      }
      break;



  }
  return state;
}