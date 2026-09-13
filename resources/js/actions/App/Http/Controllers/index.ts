import ItemController from './ItemController'
import CategoryController from './CategoryController'
import Settings from './Settings'
const Controllers = {
    ItemController: Object.assign(ItemController, ItemController),
CategoryController: Object.assign(CategoryController, CategoryController),
Settings: Object.assign(Settings, Settings),
}

export default Controllers