const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            apiUrl: "http://localhost:5000",
            email: null,
            password: null,
            currentUser: null,
            error: null,
        },
        actions: {
            handleChange: e => {
                const {name, value} = e.target;
                setStore({
                    [name]: value
                })
            },
            handleLogin: async (e, history) => {
                e.preventDefault();

                const store = getStore();
                const options = {
                    method: 'POST',
                    body: JSON.stringify({"email": store.email, "password": store.password}),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
                const resp = await fetch(store.apiUrl + "/login", options);
                const data = await resp.json();

                if(data.success){
                    setStore({
                        currentUser: data.data,
                        email: null,
                        password: null,
                        error: null,
                    })
                    history.push("/");
                }else{
                    setStore({
                        error: data.msg
                    })
                }
            }
        }
    }
}

export default getState;