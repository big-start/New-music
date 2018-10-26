import $ from 'jquery';
import app from '@/main';
import template from '@/templates/test.hbs';

export default () => {
  return {
    template: template({name: 'world track page (example)!'}),
    context: () => {
      app.fetcher(app.lastFm.albumTop).then((resolve) => {
        console.log(resolve.toptags.tag)
      });
    }
  };
}