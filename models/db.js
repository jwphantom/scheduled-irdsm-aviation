const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://james:james20@sudocare.sacxn.mongodb.net/sudocare',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
