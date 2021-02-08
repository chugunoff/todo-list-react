import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function ListElement(props) {
    const deleteBtnText = "Delete";
    const editBtnText = "Edit";

    let element = <span>{props.value}</span>;
    let editBtn = <button
        onClick={props.handleEditBtn}
    >
        {editBtnText}
    </button>;

    if (props.currentEditElemIndex === props.index) {
        element = <form onSubmit={props.handleSubmitEditForm}>
            <input type="text" value={props.currentEditElemValue} onChange={props.handleChangeEditFormValue} />
            <button>Save</button>
        </form>;
        editBtn = null;
    }

    return (
        <li>
            {element}
            {editBtn}
            <button
                onClick={props.handleDeleteBtn}
            >
                {deleteBtnText}
            </button>
        </li>
    );
}

class List extends React.Component {
    render() {
        const elements = this.props.elements;
        return (
            <ul>
                {elements.map((li, index) => {
                    return (
                        <ListElement
                            value={li}
                            index={index}
                            handleDeleteBtn={() => this.props.handleDeleteBtn(index)}
                            handleEditBtn={() => this.props.handleEditBtn(index)}
                            currentEditElemIndex={this.props.currentEditElemIndex}
                            currentEditElemValue={this.props.currentEditElemValue}
                            handleChangeEditFormValue={this.props.handleChangeEditFormValue}
                            handleSubmitEditForm={this.props.handleSubmitEditForm}
                        />
                    );
                })}
            </ul>
        );
    }
}

class Form extends React.Component {
    render() {
        return (
            <form onSubmit={this.props.handleSubmitForm}>
                <input type="text" value={this.props.formValue} onChange={this.props.handleChangeFormValue} />
                <input type="submit" value="Add" />
            </form>
        );
    }
}

class ToDoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            elements: ['one', 'two', 'three'],
            formValue: '',
            currentEditElemIndex: null,
            currentEditElemValue: null,
        }
    }

    /* Add Form Handlers */
    handleChangeFormValue(event) {
        this.setState({
            formValue: event.target.value,
        });
    }

    handleSubmitForm(event) {
        const elements = this.state.elements.concat(this.state.formValue);
        this.setState({
            elements: elements,
            formValue: '',
        });
        event.preventDefault();
    }
    /* END Add Form Handlers */

    handleEditBtn(index) {
        this.setState({
            currentEditElemIndex: index,
            currentEditElemValue: this.state.elements[index],
        });
    }

    handleChangeEditFormValue(event) {
        this.setState({
            currentEditElemValue: event.target.value,
        });
    }

    handleSubmitEditForm(event) {
        const currentEditElemIndex = this.state.currentEditElemIndex;
        const currentEditElemValue = this.state.currentEditElemValue;
        const elements = Object.assign([], this.state.elements, {[currentEditElemIndex]: currentEditElemValue});
        this.setState({
            elements: elements,
            currentEditElemIndex: null,
            currentEditElemValue: null,
        });
        event.preventDefault();
    }

    handleDeleteBtn(index) {
        const elements = this.state.elements.filter((element, i) => i !== index);
        this.setState({
            elements: elements,
            currentEditElemIndex: null,
            currentEditElemValue: null,
        })
    }

    render() {
        return (
            <div>
                <Form
                    formValue={this.state.formValue}
                    handleChangeFormValue={(event) => this.handleChangeFormValue(event)}
                    handleSubmitForm={(event) => this.handleSubmitForm(event)}
                />
                <List
                    elements={this.state.elements}
                    handleDeleteBtn={(index) => this.handleDeleteBtn(index)}
                    handleEditBtn={(index) => this.handleEditBtn(index)}
                    currentEditElemIndex={this.state.currentEditElemIndex}
                    currentEditElemValue={this.state.currentEditElemValue}
                    handleChangeEditFormValue={(event) => this.handleChangeEditFormValue(event)}
                    handleSubmitEditForm={(event) => this.handleSubmitEditForm(event)}
                />
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <ToDoList />,
    document.getElementById('root')
);
