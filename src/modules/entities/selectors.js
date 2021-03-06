import {denormalize} from 'normalizr'
import {isObject} from '../../utils'

export default ({schemas}) => {
  const initialState = {}

  const getEntity = (state = initialState, entity) => {
    return state[entity] || {}
  }

  const getDetail = (state = initialState, entity, entityId) => {
    return getEntity(state, entity)[entityId]
  }

  const getList = (state = initialState, entity, entityIdList) => {
    const ids = entityIdList || Object.keys(getEntity(state, entity))
    const entityDetailList = ids.map(entityId =>
      getDetail(state, entity, entityId),
    )
    return entityDetailList.filter(isObject)
  }

  const getDenormalizedDetail = (state = initialState, entity, entityId) => {
    return denormalize({[entity]: entityId}, schemas[entity], state)
  }

  const getDenormalizedList = (state = initialState, entity, entityIdList) => {
    const schema = schemas[entity]
    return denormalize({[entity]: entityIdList}, [schema], state)
  }

  return {
    initialState,
    getEntity,
    getDetail,
    getList,
    getDenormalizedDetail,
    getDenormalizedList,
  }
}
