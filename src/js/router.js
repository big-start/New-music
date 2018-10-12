function Router(e) {
    let content = document.querySelector('.item');
    let items = {
        artist: "Artists",
        track: "Track",
        album: "Album",
        chart: "Chart"
    };

    this.updatePage = function (data) {
        if (!data) return;
        content.innerHTML = items[data]
    };

    this.state = function (e) {
        let state;
        if (e.target.tagName !== 'A') return;
        state =  e.target.getAttribute('href');
        history.pushState(state, '', state);
        this.updatePage(state);
    }
}

export default Router;
