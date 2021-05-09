# Kanban board
### React.js frontend

Az alkalmazás megjelenítését, frontednjét ReactJs framework adja.

A felület:
![image](https://user-images.githubusercontent.com/39564586/117572709-650f7800-b0d4-11eb-8c69-e8418f6e4ed7.png)

# Column komponens
Az induláskor megjelenő felületet a projekt Column.js komponense generálja ki. A felület html kódját az alábbi render metódus generálja:

```
render() {
        const {columns} = this.state;
        return (
            <div className="home">
                <div className="row">
                    {columns.map(col =>
                        <div className="col" align="center">
                            <h2>{col.state}</h2>
                            <Todo todos={col.tasks}/>
                        </div>
                    )}
                </div>
            </div>

        )
    }
```
A metódus elején a this.state-ben tárolt oszlopkat egy lokális változóba menti majd a row osztályú div tagen belül ezen végig iterálva megjeleníti az oszlopokat és átadja a Todo komponensnek a teendők listáját.

A lekérést az alábbi aszinkron metódus végzi:
```
async getData(){
        let res = await fetch(process.env.REACT_APP_API + 'columns');

        if(res.ok){
            let json = await res.json();
            return json;
        }

    }
```

A Column komponens state-je a konstruktorban jön létre:
```
    constructor(props) {
        super(props);
        this.state = {
            columns: [],
            showAddModal: false
        }
    }
```

# AddTodoModal komponens
A teendők létrehozásához az AddTodoModal komponens által generált moduláris ablak jelenik meg:
![image](https://user-images.githubusercontent.com/39564586/117572740-84a6a080-b0d4-11eb-96d2-003bfd47afa6.png)

Az Add Todo gomb lenyomása meghívja az alábbi metódust a komnponensen belül:
```
async postData(event){
        await fetch(process.env.REACT_APP_API+'tasks',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Title:event.target.TodoTitle.value,
                Description:event.target.TodoDescription.value,
                DeadLine: this.state.date
            })
        })
    }
```
A http kérés itt látszik, hogy POST mivel létrehozunk adatot az adatbázisnak.

# Todo komponens
A Column komponens a teendők generálását tovább adja a Todo komponensnek.
A Todo komponens render függvénye a következő (átláthatóság miatt a button tagek között lévő gomb desgin svg tageket eltávolítottam innen, a kódban nem ) :
```
render() {
        const {todoId, todoTitle, todoDesc, todoState} = this.state;
        let editTodoModal = () => this.setState({showEditModal: false});
        return (

            <div>
                {this.props.todos.map(t =>
                    <div className="card">
                        <div className="card-body">
                            <h4>{t.title}</h4>
                            <p>{t.description}</p>
                            <p><h5>Létrehozva ekkor: </h5>{t.createdAt}</p>
                            <ButtonToolbar>

                                <div className="buttons">
                                    <Button className="mr-2" variant="info"
                                            onClick={() => this.setState({
                                                showEditModal: true,
                                                todoId: t.id,
                                                todoTitle: t.title,
                                                todoDesc: t.description,
                                                todoState: t.state
                                            })}
                                    >
                                        Edit button
                                    </Button>
                                    <Button className="mr-2" variant="danger"
                                            onClick={() => this.deleteTodo(t.id)}
                                    >
                                        Delete button
                                    </Button>

                                    <Button onClick={() => this.doneTodo(t.id)}>
                                        Done button
                                    </Button>
                                </div>

                                <EditTodoModal show={this.state.showEditModal}
                                               onHide={editTodoModal}
                                               todoId={todoId}
                                               todoTitle={todoTitle}
                                               todoDesc={todoDesc}
                                               todoState={todoState}
                                />

                            </ButtonToolbar>
                        </div>
                    </div>
                )}
            </div>
        )
    }
```


A megjelenítési feladatokon kívül ez a komponens kezeli a teendőket érintő műveleteket, minen művelet egy Backend-en lévő API endpoint hívását jelenti.

Törlés és a DONE státuszba állítás:
A törlést végző metódus:
```
    async deleteTodo(todoId) {
        if (window.confirm('Are you sure?')) {
            await fetch(process.env.REACT_APP_API + 'tasks/' + todoId, {
                method: 'DELETE',
                header: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
        }
    }
```

A DONE státusz az alábbi metódus állítja be:
```
async doneTodo(todoId) {
        await fetch(process.env.REACT_APP_API + 'tasks/' + todoId, {
            method: 'POST',
            header: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
    }
```

# EdiTodoModal komponens
A teendők módosításaát az EditTodoModal komponens végzi ami egy moduláris ablakot jelenít meg, ahol a teendő adataik módosíthatók.
![image](https://user-images.githubusercontent.com/39564586/117572757-99833400-b0d4-11eb-9de8-2e911afc535c.png)

Az ablak render() függvénye:
```
render(){
        return (
            <div className="container">

                <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header clooseButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Edit todo
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="TodoTitle">
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control type="text" name="TodoTitle" required
                                                      placeholder="Title"
                                                      defaultValue={this.props.todoTitle}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="TodoDescription">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control type="text" name="TodoDescription" required
                                                      placeholder="Description"
                                                      defaultValue = {this.props.todoDesc}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="TodoState">
                                        <Form.Label>State: {this.state.selectedState}</Form.Label>

                                        <div>
                                            <select
                                                value={this.props.todoState}
                                                onChange={(e) => this.setState({selectedState: e.target.value})}
                                            >
                                                <option value="FÜGGŐBEN">FÜGGŐBEN</option>
                                                <option value="ELHALASZTVA">ELHALASZTVA</option>
                                                <option value="FOLYAMATBAN">FOLYAMATBAN</option>
                                            </select>
                                        </div>
                                    </Form.Group>

                                    <Form.Group>
                                        <Button variant="primary" type="submit" onClick={this.props.onHide}>
                                            Update todo
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>

                </Modal>

            </div>
        )
    }
```

A módosítást elküldő függvény:
```
handleSubmit(event){
        event.preventDefault();

        this.updateData(event);
    }

    async updateData(event){
        await fetch(process.env.REACT_APP_API+'tasks',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                id: this.props.todoId,
                title:event.target.TodoTitle.value,
                description:event.target.TodoDescription.value,
                state: this.state.selectedState
            })
        })
    }
```
Itt az eddigi kérésekhez hasonlítva látszik, hogy itt a method az PUT mivel adatmódosítás történik nem pedig lekérés vagy létrehozás.


