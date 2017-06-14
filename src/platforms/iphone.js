export default async function() {
    console.log('IPHONE');
    return Promise.resolve({ html: 'IPHONE_HEADERS', files: ['i1.png', 'i2.png'] });
}
