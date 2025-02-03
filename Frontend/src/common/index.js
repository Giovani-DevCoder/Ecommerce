// Definir el dominio base para el backend
const backendDomin = 'http://localhost:8080';

// Configuración de las rutas de las API's
const SummaryApi = {
  signUP : {
    url : `${backendDomin}/api/signup`,
    method: 'post'
  },
  login : {
    url : `${backendDomin}/api/login`,
    method  : 'post'
  },
  current_user : {
    url: `${backendDomin}/api/user-details`,
    method  : 'get'
  },
  logout_user : {
    url : `${backendDomin}/api/userLogout`,
    method : 'get'
  },
  allUser : {
    url : `${backendDomin}/api/all-users`,
    method : 'get'
  },
  uploadProduct : {
    url : `${backendDomin}/api/upload-product`,
    method : 'post'
  },
  updateUser : {
    url : `${backendDomin}/api/update-user`,
    method : 'post'
  },
  allProduct: {
    url : `${backendDomin}/api/get-product`,
    method : 'get'
  },
  updateProduct: {
    url : `${backendDomin}/api/update-product`,
    method : 'post'
  },
  productCategory: {
    url : `${backendDomin}/api/get-productCategory`,
    method : 'get'
  }
};

export default SummaryApi;
