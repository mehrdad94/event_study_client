import { createStore } from 'redux'
import { createMigrate, persistStore, persistReducer } from 'redux-persist'
import migrations from './migrations'
import storage from 'redux-persist/lib/storage'
import rootReducer from './reducers'

const persistConfig = {
  key: 'root',
  version: '1.1',
  storage,
  migrate: createMigrate(migrations, { debug: false })
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer)
export const persistor = persistStore(store)
