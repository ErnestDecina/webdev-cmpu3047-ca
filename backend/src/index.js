import path from 'path';
import { express_app } from './server.js';


console.log(path.resolve());
express_app.get('/', (req, res) => {
    res.sendFile(path.join(path.resolve() + '/../frontend/index.html'));
});

express_app.listen(8000, () => {
    console.log('http://localhost:8000/');    
})