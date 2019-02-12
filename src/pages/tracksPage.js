import app from '@/main';
import template from '@/templates/appWrapper.hbs';
import topTracks from '@/templates/components/topTracks.hbs';

require('@/assets/styles/top-tracks.less');

export default () => {
  return app.createComponent({
    template: template({
      artists: window.location.pathname.indexOf('artists') !== -1,
      tracks: window.location.pathname.indexOf('tracks') !== -1
    }),
    context: ({$, $api}) => {
      function getTracks(page) {
        $api.getTopTracks({page}).then((data) => {
          const totalPages = data.tracks['@attr'].totalPages;
          app.render({template: topTracks({
            data,
            title: 'Top tracks list',
            page: {
              isDisabledNext: page+1 > totalPages,
              past: page-1,
              current: page,
              next: page+1,
              total: totalPages
            }
          })}).then(() => {
            $('.j-paginator-btn').on('click', function() {
              getTracks($(this).data('type') === 'prev' ? page - 1 : page + 1);
            });
          });
        });
      }
      getTracks(1);
    }
  });
};