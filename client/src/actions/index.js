import axios from 'axios';

export function getTeas(
    limit = 2,
    start = 0,
    order = 'asc',
    list = '') {

  const request = axios.get(`/api/teas?limit=${limit}&skip=${start}&order=${order}`)
    .then(response => {
          if (list) {
            return [... list, ... response.data];
          } else {
            return response.data;
          }
        }
  );
  return {
    type: 'GET_TEAS',
    payload: request,
  };
}

export function getTeaByOwner(id) {
  const request = axios.get(`/api/tea?id=${id}`);

  return (dispatch) => {
    request.then(({ data }) => {
      let tea = data;

      //console.log(tea.creatorId);

      axios.get(`/api/creator?id=${tea.creatorId}`)
      .then(({ data }) => {
          let request = { tea, creator: data, };

          console.log(request);
          dispatch({
            type: 'GET_TEA_BY_CREATOR',
            payload: request,
          });
        });

    });
  };
}

//clears store to load fresh blank page prior to new page load.
export function clearTeaByOwner() {
  return {
    type: 'CLEAR_TEA_BY_CREATOR',
    payload: { tea: {}, creator: {}, },
  };
}

export function createTea(tea) {
  console.log(tea);
  let request = axios.post('/api/tea/create_tea', tea)
  .then(response => response.data);
  console.log(request);
  return {
    type: 'CREATE_TEA',
    payload: request,
  };
}

export function clearNewTea() {
  return {
    type: 'CLEAR_NEW_TEA',
    payload: {},
  };
}

//---------- user stuff ---------//
export function loginUser(email, password) {
  console.log(email); //--email exists here
  console.log(password); //--password exists here
  const request = axios.post('/api/login', { email, password })
  .then(response => response.data);
  console.log(request);

  return {
    type: 'USER_LOGIN',
    payload: request,
  };
}

export function auth() {
  const request = axios.get('/api/auth').then(response => response.data);

  return {
    type: 'USER_AUTH',
    payload: request,
  };
}
