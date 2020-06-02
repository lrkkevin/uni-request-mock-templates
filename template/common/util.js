function createAPI(baseURL) {
    return function(conf) {
        conf = conf || {};
        // Promise
        return new Promise((resolve, reject) => {
            uni.showLoading();
            uni.request({
                url: baseURL + conf.url,
                method: conf.method,
                data: conf.opts,
                success: res => {
                    uni.hideLoading();
                    resolve(res.data.data);
                },
                fail: err => {
                    uni.hideLoading();
                    console.log('err')
                    reject(err)
                }
            })
        }).catch(err => console.log(err))
    };
}

function convertRESTAPI(url, opts) {
    if (!opts || !opts.path) return url;

    const pathKeys = Object.keys(opts.path);

    pathKeys.forEach((key) => {
        const r = new RegExp('(:' + key + '|{' + key + '})', 'g');
        url = url.replace(r, opts.path[key]);
    });

    return url;
}

export {
    createAPI,
    convertRESTAPI
};
