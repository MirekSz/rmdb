import React, { Component } from 'react';
import { Button, Container, Row, Col, Input, Autocomplete, MDBDataTable, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';
import logo from './logo.svg';
import './App.css';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import { observable, decorate, configure, action, runInAction } from "mobx"
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
configure({ enforceActions: true });
const states = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illnois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming"
];

class FormsPage extends React.Component {
  render() {
    return (
      <Container>
        <Row>
          <Col md="6">
            <form>
              <p className="h5 text-center mb-4">Sign in</p>
              <div className="grey-text">
                <Input label="Type your email" icon="envelope" group type="email" validate error="wrong" success="right" />
                <Input label="Type your password" icon="lock" group type="password" validate />
              </div>
              <div className="text-center">
                <Button>Login</Button>
              </div>
            </form>
          </Col>
        </Row>
      </Container>
    );
  }
};
const DatatablePage = () => {
  const data = {
    columns: [
      {
        label: 'Name',
        field: 'name',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Position',
        field: 'position',
        sort: 'asc',
        width: 270
      },
      {
        label: 'Office',
        field: 'office',
        sort: 'asc',
        width: 200
      },
    ]
  };

  return (
    <MDBDataTable
      striped
      bordered
      small
      data={data}
    />
  );
}

class AutocompleteExample extends React.Component {

  render() {
    return (
      <Col md="6">
        <Autocomplete />
      </Col>
    );
  }
}
class ModalPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    return (
      <Container>
        <Button color="danger" onClick={this.toggle}>Modal</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>
            {this.props.children}
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>Close</Button>{' '}
            <Button color="primary">Save changes</Button>
          </ModalFooter>
        </Modal>
      </Container>
    );
  }
}
let localeContext = React.createContext('locale');
function logProps(WrappedComponent) {
  return class extends React.Component {
    componentWillReceiveProps(nextProps) {
      console.log('Current props: ', this.props);
      console.log('Next props: ', nextProps);
    }
    render() {
      // Wraps the input component in a container, without mutating it. Good!
      return <WrappedComponent {...this.props} />;
    }
  }
}
export class MChild extends React.PureComponent {
  send() {
    let key = Object.keys(this.props)[0]
    this.props.handler(key);
  }
  render() {
    let key = Object.keys(this.props)[0]
    console.log(key);
    let data = JSON.stringify(this.props)
    let children = this.props.children ? this.props.children({ name: key }) : null
    return (
      <localeContext.Consumer>{theme =>
        <div>{data} <button onClick={this.send.bind(this)}>{key} </button>
          {theme}
          {children}
        </div>
      }</localeContext.Consumer>);
  }
}
MChild.propTypes = {
  handler: PropTypes.func.isRequired
};
let SuperMChild = logProps(MChild)
let inner = ({ name }) => {
  return (<div>inner for child b= {name}</div>);
};
export class Parent extends React.Component {
  constructor() {
    super();
    this.state = { a: { i: 0 }, b: { i: 0 }, lastKey: 'a' }
    this.ha = this.handle.bind(this);
  }
  drop(e) {
    var data = parseInt(e.dataTransfer.getData("number"));
    this.handle('a', data)
    this.handle('b', data)
  }
  dropHack = (e) => {
    var data = parseInt(e.dataTransfer.getData("number"));
    this.handle('a', data)
    this.handle('b', data)
  }
  allowDrop(ev) {
    ev.preventDefault();
  }

  handle(key, val) {
    this.state[key] = { i: this.state[key].i + (val ? val : 1) };
    this.state = Object.assign({}, this.state, { lastKey: key })
    this.setState(this.state);
  }
  render() {
    return (
      <div onDrop={this.dropHack} onDragOver={this.allowDrop}>
        {this.state.lastKey}
        <localeContext.Provider value={this.state.lastKey}>
          <MChild a={this.state.a} handler={this.ha} />
          <SuperMChild b={this.state.b} handler={this.ha} >
            {inner}
          </SuperMChild>
        </localeContext.Provider>
      </div>);
  }
}

let drag = (cols) => (ev) => {
  ev.dataTransfer.setData("number", cols);
}

const layoutModel = [{ title: '6', cols: 6 }, { title: '6', cols: 6 }, { title: '4', cols: 4 }, { title: '8', cols: 8 }]
function getComponent(type) {
  return <input value={type}></ input>
}
class App extends Component {
  render() {
    let layout = [];
    for (let m of layoutModel) {
      layout.push((<div onDragStart={drag(m.cols)} draggable="true" class={"col-" + m.cols} style={{ border: '1px solid black' }}>
        {m.title} {getComponent(m.cols)}
      </div>))
    }
    return (
      <div className="App">
        <Parent >
          <div slot="a"></div>
          <div slot="b"></div>
        </Parent>
        {layout}
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Button color="primary">Primary</Button>
          <h1 className="App-title">Welcome to React 2</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
          <ModalPage >
            <FormsPage />
          </ModalPage>
        </p>
        <FormsPage />
        <FormsPageAdv />
        <Col md="6">
          <TodoView todo={store} />
          <InputView todo={store} />
        </Col>
      </div>
    );
  }
}
class Todo {
  id = Math.random();
  title = "";
  finished = false;
  loading = false;
  changeTitle(title) {
    this.title = title;
  }
  finish() {
    this.loading = true;
    setTimeout(() => {
      runInAction(() => {
        this.finished = !this.finished
        this.loading = false;
      });
    }, 1000)
  }
}

decorate(Todo, {
  title: observable,
  finished: observable,
  loading: observable,
  changeTitle: action.bound,
  finish: action.bound,

})

const store = new Todo();

const TodoView = observer(({ todo }) =>
  <li>
    {todo.loading ? (
      <p> Loading...</p>
    ) : (
        <div>
          <input
            type="checkbox"
            checked={todo.finished}
            onClick={() => todo.finish()}
          />{todo.title} {todo.finished + ''}
        </div>
      )}
  </li>
)

class InputView extends React.Component {

  handleInputChanged = (event) => {
    const { todo } = this.props;
    todo.changeTitle(event.target.value);
  }

  render() {
    console.log('render')
    const { todo } = this.props;
    console.log(todo)
    return (
      <div>
        <Input label="title"
          value={todo.title}
          onChange={this.handleInputChanged}
        />
        tu={todo.title} check={todo.finished + ''}
      </div>
    );
  }
}
observer(InputView);
console.log(store.title)
console.log(store.finished)

class FormsPageAdv extends React.Component {

  state = {
    fname: 'Mark',
    lname: 'Otto',
    email: 'examplde@gmail.com',
    city: '',
    state: '',
    zip: '12'
  }

  submitHandler = (event) => {
    event.preventDefault();
    event.target.className += ' was-validated';
  }

  changeHandler = (event) => {
    this.setState({ ...this.state, [event.target.name]: event.target.value })
  }

  render() {
    return (
      <Container className="mt-5">
        <Row className="mt-6">
          <Col md="">
            <form className='needs-validation' onSubmit={this.submitHandler} noValidate>
              <Row>
                <div className="col-md-4 mb-3">
                  <label htmlFor="defaultFormRegisterNameEx" className="grey-text">First name</label>
                  <input value={this.state.fname} name='fname' onChange={this.changeHandler} type="text" id="defaultFormRegisterNameEx" className="form-control" placeholder="First name" required />
                  <div className="valid-feedback">Looks good!</div>
                </div>
                <div className="col-md-4 mb-3">
                  <label htmlFor="defaultFormRegisterEmailEx2" className="grey-text">Last name</label>
                  <input value={this.state.lname} name='lname' onChange={this.changeHandler} type="text" id="defaultFormRegisterEmailEx2" className="form-control" placeholder="Last name" required />
                  <div className="valid-feedback">Looks good!</div>
                </div>
                <div className="col-md-4 mb-3">
                  <label htmlFor="defaultFormRegisterConfirmEx3" className="grey-text">Email</label>
                  <input value={this.state.email} onChange={this.changeHandler} type="email" id="defaultFormRegisterConfirmEx3" className="form-control" name='email' placeholder="Your Email address" />
                  <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
              </Row>
              <Row>
                <div className="col-md-4 mb-3">
                  <label htmlFor="defaultFormRegisterPasswordEx4" className="grey-text">City</label>
                  <input value={this.state.city} onChange={this.changeHandler} type="text" id="defaultFormRegisterPasswordEx4" className="form-control" name='city' placeholder="City" required />
                  <div className="invalid-feedback">Please provide a valid city.</div>
                  <div className="valid-feedback">Looks good!</div>
                </div>
                <div className="col-md-4 mb-3">
                  <label htmlFor="defaultFormRegisterPasswordEx4" className="grey-text">State</label>
                  <input value={this.state.state} onChange={this.changeHandler} type="text" id="defaultFormRegisterPasswordEx4" className="form-control" name='state' placeholder="State" required />
                  <div className="invalid-feedback">Please provide a valid state.</div>
                  <div className="valid-feedback">Looks good!</div>
                </div>
                <div className="col-md-4 mb-3">
                  <label htmlFor="defaultFormRegisterPasswordEx4" className="grey-text">Zip</label>
                  <input value={this.state.zip} onChange={this.changeHandler} type="text" id="defaultFormRegisterPasswordEx4" className={'form-control' + (this.state.zip == 'abc' ? 'is-invalid' : '')} name='zip' placeholder="Zip" required />
                  {this.state.zip == 'abc' && <div className="invalid-feedback">ABC is invalid</div>}
                  <div className="invalid-feedback">Please provide a valid zip.</div>
                  <div className="valid-feedback">Looks good!</div>
                </div>
              </Row>
              <div className="col-md-4 mb-3">
                <div className="form-check pl-0">
                  <input className="form-check-input" type="checkbox" value="" id="invalidCheck" required />
                  <label className="form-check-label" htmlFor="invalidCheck">
                    Agree to terms and conditions
                </label>
                  <div className="invalid-feedback">
                    You must agree before submitting.
                </div>
                </div>
              </div>
              <button className="btn btn-unique" type="submit">Submit Form</button>
            </form>
          </Col>
        </Row>
      </Container>
    );
  }
};
export default App;
