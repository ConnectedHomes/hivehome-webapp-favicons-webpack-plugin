export default async function() {
    console.log('WINDOWS');
    return Promise.resolve({ html: 'WINDOWS_HEADERS', files: ['w1.png', 'w2.png'] });
}
