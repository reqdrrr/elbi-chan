import React, { Component } from 'react';
// import { BrowserRouter, Route } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Jumbotron from 'react-bootstrap/Jumbotron'
// import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

class Acads extends Component {
    constructor(props) {
        super(props)
        this.state = {
            threads: [],
            category: "Academics",
            title: "",
            author: "",
            content: ""
        }

        this.addThread = this.addThread.bind(this)
    }

    componentDidMount() {
        //send request to back end server
        fetch('https://elbi-chan-api.herokuapp.com/find-threads-by-category?category=Academics')
            .then(response => response.json())
            .then(body => {
                //set value of state
                if(body.success) this.setState({ threads: body.threads })
            })
    }

    addThread() {
        const ThreadTitle = document.getElementById('thread-title').value
        const ThreadAuthor = document.getElementById('thread-author').value
        const ThreadBody = document.getElementById('thread-body').value

        this.setState({
            title: ThreadTitle,
            author: ThreadAuthor,
            content: ThreadBody
        }, ()=> {
            fetch('https://elbi-chan-api.herokuapp.com/add-thread', {
                method: "POST",
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    threadCategory: this.state.category,
                    threadTitle: this.state.title,
                    threadAuthor: this.state.author,
                    threadBody: this.state.content
                })
            })
            .then(response => response.json())
            .then(body => {
                window.location.href = window.location.href
            })

        })


    }

    render() { return (
        <div>
            {/* Navbar */}
            <Navbar className="tb-navbar justify-content-center" variant="dark" bg="dark">
				<Nav className="tb-nav">
					<Nav.Item>
						<Nav.Link href="/">Personal</Nav.Link>
					</Nav.Item>

					<Nav.Item>
						<Nav.Link href="/acads" active="true">Academics</Nav.Link>
					</Nav.Item>					
				</Nav>
			</Navbar>


            {/* Add new thread */}
            <Container><Jumbotron>
                <Form className="add-thread">
                    <Form.Group controlId="thread-title">
                        <Form.Control as="textarea" placeholder="Title"/> 
                    </Form.Group>
                    <Form.Group controlId="thread-author">
                        <Form.Control as="textarea" placeholder="Name"/>
                    </Form.Group>
                    <Form.Group controlId="thread-body">
                        <Form.Control as="textarea" rows="4" placeholder="Enter text here."/>
                    </Form.Group>

                    <Button type="Button" variant="dark" className="thread-button" onClick={this.addThread} >Post</Button>

                </Form>
            </Jumbotron></Container>


            {/* Render threads */}
            <Container>
            {
                this.state.threads.map( (t,i) => {
                    return (
                        <Jumbotron key={i}>
                            <h2>{t.ThreadTitle}</h2>
                            <p>{t.ThreadAuthor} {t.ThreadDate}</p>
                            <p>{t.ThreadBody}</p>
                        </Jumbotron>
                    )
                })
            }
            </Container>
        </div>)
    }
}

export default Acads
