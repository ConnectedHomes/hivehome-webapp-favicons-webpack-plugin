export default async function() {
    console.log('ANDROID');
    return Promise.resolve({ html: 'ANDROID_HEADERS', files: ['a1.png', 'a2.png'] });
}
