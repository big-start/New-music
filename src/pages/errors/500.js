import template from '@/templates/errors/errorPage.hbs';

export default () => {
  return {
    template: template({errorCode: '500'}),
    context: () => {}
  };
}
