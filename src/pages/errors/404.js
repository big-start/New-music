import template from '@/templates/errors/errorPage.hbs';

export default () => {
  return {
    template: template({errorCode: '404'}),
    context: () => {}
  };
}
