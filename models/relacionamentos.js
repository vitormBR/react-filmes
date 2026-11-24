const Filme = require('./filme');
const Diretor = require('./diretor');
const Artista = require('./artista');
const FichaTecnica = require('./fichaTec');

Filme.hasOne(FichaTecnica, { foreignKey: 'filmeId', as: 'fichaTecnica', onDelete: 'CASCADE' });
FichaTecnica.belongsTo(Filme, { foreignKey: 'filmeId', as: 'filme' });

Diretor.hasMany(Filme, { foreignKey: 'diretorId', as: 'filmes' });
Filme.belongsTo(Diretor, { foreignKey: 'diretorId', as: 'diretor' });

Filme.belongsToMany(Artista, { through: 'FilmeArtista', as: 'artistas' });
Artista.belongsToMany(Filme, { through: 'FilmeArtista', as: 'filmes' });

module.exports = { Filme, Diretor, Artista, FichaTecnica };
