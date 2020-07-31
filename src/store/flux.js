const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            apiUrl: "http://localhost:5000",
            email: 'lrodriguez@4geeks.co',
            password: '123456',
            currentUser: null,
            error: null,
            avatar: null,
            success: null,
        },
        actions: {
            getAvatar: filename => {
                const store = getStore();
                return `${store.apiUrl}/images-profile/${filename}`; 
            },
            handleChange: e => {
                const {name, value} = e.target;
                setStore({
                    [name]: value
                })
            },
            handleFile: e => {
                const {name, files} = e.target;
                //console.log(((files[0].size/1024)/1024) > 2);
                setStore({
                    [name]: files[0]
                })
            },
            handleUpdateProfile: e => {
                e.preventDefault();
                const store = getStore();

                let formData = new FormData();
                formData.append("avatar", store.avatar);


                //formData.append("name", store.name);
                //formData.append("lastname", store.lastname);

                fetch(`${store.apiUrl}/update-profile`, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Authorization': `Bearer ${store.currentUser.access_token}`
                    }
                })
                .then(resp => resp.json())
                .then(data => {
                    console.log(data);
                    let {currentUser} = store;
                    currentUser['user'] = data.user;
                    setStore({
                        success: data.success,
                        currentUser: currentUser,
                        avatar: null
                    })
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
                    // Investigar como crear variables en el sessionStorage y localStorage
                    // para guardar el currentUser

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