import $ from 'jquery';
import app from '@/main';
import template from '@/templates/test.hbs';

export default () => {
  return {
    template: template({name: 'world band page (example)!'}),
    context: () => {
      console.log('band');
    }
  };
}