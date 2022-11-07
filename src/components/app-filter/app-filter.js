


import "./app-filter.css";

const AppFilter = (props) => {
    const buttonsData = [
        { name: "all", label: "Все сотрудники" },
        { name: "rise", label: "На повышение" },
        { name: "moreThen100", label: "З/П больше $1000" },
        { name: "increase", label: "Надбавка" },
    ];
   
    const buttons = buttonsData.map(({ name, label }) => {
        const active = props.filter === name;
        const clazz = active ? 'btn-light' : "btn-outline-light"
        return (
            <button type="button"
                className={`btn ${clazz}`}
                key = { name } 
                onClick={  () => props.onFilterSelect(name) } >
                { label }
            </button>

        )
    })
  
    return (
        <div className="btn-group">
            { buttons }

            {/* <button type="button"
                    className="btn btn-light">
                    Все сотрудники
            </button>
            <button type="button"
                    className="btn btn-outline-light"
                    onClick={ this.buttonsData }
                    >
                    На повышение
            </button>
            <button type="button"
                    className="btn btn-outline-light">
                    З/П больше $10 000
            </button> */}
        </div>
    )
  
}

export default AppFilter;