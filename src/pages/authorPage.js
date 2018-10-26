import $ from 'jquery';
import app from '@/main';
import template from '@/templates/test.hbs';

export default () => {
  return {
    template: template({name: 'world author page (example)!'}),
    context: () => {
      app.fetcher(app.lastFm.allTrack).then((resolve) => {
        console.log(resolve.tags.tag)
      });
    }
  };
}
