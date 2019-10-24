import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

const AdapterClass = Adapter as () => void
configure({ adapter: new AdapterClass() })
