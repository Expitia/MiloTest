import {
  Alert,
  Button,
  Icon,
  Input,
  Layout,
  List,
  Modal,
  Select,
  Tag,
} from 'antd'
import classnames from 'classnames'
import React from 'react'
import { useParams } from 'react-router-dom'
import { ITask, Types } from '../domain/models'

const { Option } = Select
const { Header, Content, Footer } = Layout

/**
 * Base page component
 *
 * @param {IProps}  props
 */
const App = ({
  tasks,
  onDone,
  onCancel,
  onCreate,
  onFilterText,
  onFilterOption,
}: IProps) => {
  const { type } = useParams()

  React.useEffect(() => {
    onFilterOption && onFilterOption(type)
  }, [type])

  const types = Object.values(Types).map(value => value.toLocaleLowerCase())

  return (
    <Layout>
      <Header>
        <img src="favicon.png" />
      </Header>
      <Content>
        <h1>List information</h1>
        {/* If the parameter in invalid then we show a error message */}
        {type && !types.includes(type.toLocaleLowerCase()) && (
          <Alert
            message="Invalid URL parameter. Try with: /done, /delete, /todo"
            type="error"
            showIcon
          />
        )}
        <ListOptions
          type={type}
          onCreate={onCreate}
          onFilterText={onFilterText}
          onFilterOption={onFilterOption}
        />
        <List
          dataSource={tasks}
          renderItem={item => (
            <RowTask task={item} onDone={onDone} onCancel={onCancel} />
          )}
          locale={{ emptyText: 'There are task created' }}
        />
      </Content>
      <Footer>
        Powered by Ant Design <br /> Created for Rafael Espitia
      </Footer>
    </Layout>
  )
}

/**
 * Components with the list filters and options
 *
 * @param {IOptionsProps}  props
 */
export const ListOptions = ({
  type,
  onCreate,
  onFilterText,
  onFilterOption,
}: IOptionsProps) => {
  return (
    <div className="list-options">
      <Input
        placeholder="Write a description to filter"
        onChange={ev => onFilterText && onFilterText(ev.target.value)}
      />
      <Select
        defaultValue={type ? type.toLocaleLowerCase() : ''}
        onChange={(value: string) => onFilterOption && onFilterOption(value)}
      >
        <Option value="">Select a type to filter</Option>
        <Option value={Types.TODO.toLocaleLowerCase()}>To do task</Option>
        <Option value={Types.DONE.toLocaleLowerCase()}>Success task</Option>
        <Option value={Types.DELETE.toLocaleLowerCase()}>Deleted task</Option>
      </Select>
      <CreaterRow onAccept={description => onCreate && onCreate(description)} />
    </div>
  )
}

/**
 * Components for the rows, contain the row information and individual options
 *
 * @param {IRowProps}  props
 */
export const RowTask = ({ task, onDone, onCancel }: IRowProps) => {
  const { type, description } = task

  return (
    <div
      className={classnames({
        'option-todo': type === Types.TODO,
        'option-success': type === Types.DONE,
        'option-delete': type === Types.DELETE,
      })}
    >
      <span>{description}</span>
      {type === Types.TODO && (
        <div>
          <Button
            title="Done task"
            className="button-success"
            onClick={() => onDone && onDone(task)}
          >
            <Icon type="check" />
          </Button>
          <Button
            title="Delete task"
            className="button-delete"
            onClick={() => onCancel && onCancel(task)}
          >
            <Icon type="delete" />
          </Button>
        </div>
      )}
      {type === Types.DONE && <Tag color="green">Done</Tag>}
      {type === Types.DELETE && <Tag color="red">Deleted</Tag>}
    </div>
  )
}

/**
 * Components for the creator panel
 *
 * @param {IRowProps}  props
 */
const CreaterRow = ({ onAccept }) => {
  const [value, setValue] = React.useState('')
  const [isVisible, setVisible] = React.useState(false)

  return (
    <React.Fragment>
      <Button title="Add new task" onClick={() => setVisible(true)}>
        <Icon type="plus" /> <span>Add a new task</span>
      </Button>
      <Modal
        onOk={() => {
          if (value) {
            onAccept(value)
            setVisible(false)
          }
        }}
        visible={isVisible}
        onCancel={() => setVisible(false)}
      >
        <Input
          placeholder="Write the name of the task"
          onChange={ev => setValue(ev.target.value)}
        />
      </Modal>
    </React.Fragment>
  )
}

interface IOptionsProps {
  type: string
  onCreate?: (text: string) => void
  onFilterText?: (value: string) => void
  onFilterOption?: (value: string) => void
}

interface IRowProps {
  task: ITask
  onDone?: (task: ITask) => void
  onCancel?: (task: ITask) => void
}

export interface IProps extends Partial<IOptionsProps>, Partial<IRowProps> {
  tasks: ITask[]
}

export default App
