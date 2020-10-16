const locationReducer = (state, action) => {
  switch (action.type) {
    case 'set countries': {
      return {
        ...state,
        data: { ...state.data, countries: action.countries }
      }
    }

    case 'set cities': {
      return {
        ...state,
        data: { ...state.data, cities: action.cities },
        loading: { ...state.loading, city: false }
      }
    }

    case 'set areas': {
      return {
        ...state,
        data: { ...state.data, areas: action.areas },
        loading: { ...state.loading, area: false }
      }
    }

    case 'set error': {
      return {
        ...state,
        error: { ...state.error, city: !state.location.city, country: !state.location.country }
      }
    }

    case 'update location': {
      return {
        ...state,
        location: { ...state.location, [action.key]: action.value },
        error: action.key === 'area' ? { ...state.error } : { ...state.error, [action.key]: !action.value }
      }
    }

    case 'update cities': {
      return {
        ...state,
        loading: { ...state.loading, city: true },
        location: { ...state.location, city: '', area: '' }
      }
    }

    case 'update areas': {
      return {
        ...state,
        loading: { ...state.loading, area: true },
        location: { ...state.location, area: '' }
      }
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

export default locationReducer
