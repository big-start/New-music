import $ from 'jquery';
import app from '@/main';
import template from '@/templates/test.hbs';

export default () => {
  return {
    template: template({name: 'world band page (example)!'}),
    context: () => {
      app.$api.albumTop({method: 'gettoptags',artist: 'radiohead',track: 'the%20bends'}).then((resolve) => {
        console.log(resolve)
      });
    }
  };
}