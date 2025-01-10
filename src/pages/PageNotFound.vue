<template>
    <div class="page-not-found">
      <h1>404 - Page Not Found</h1>
      <p>Sorry, you do not have permission to view this page or the page does not exist.</p>
    </div>
  </template>
  
  <script>
  export default {
    name: "PageNotFound",
  };
  </script>
  
  <style scoped>
  .page-not-found {
    text-align: center;
    padding: 50px;
    font-size: 24px;
  }
  
  h1 {
    font-size: 50px;
    color: #ff6347; /* Tomato color for the 404 text */
  }
  
  p {
    font-size: 18px;
    color: #555;
  }
  
  router-link {
    font-size: 20px;
    color: #4682b4;
    text-decoration: none;
  }
  
  router-link:hover {
    text-decoration: underline;
  }
  </style>
  