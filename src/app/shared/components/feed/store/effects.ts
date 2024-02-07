import {inject} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {catchError, map, of, switchMap} from 'rxjs'
import {FeedService} from './../services'
import {GetFeedResponseInterface} from './../types'
import {feedActions} from './'

export const getFeedEffect = createEffect(
  (actions$ = inject(Actions), feedService = inject(FeedService)) => {
    return actions$.pipe(
      ofType(feedActions.getFeed),
      switchMap(({url}) => {
        return feedService.getFeed(url).pipe(
          map((feed: GetFeedResponseInterface) => {
            return feedActions.getFeedSuccess({feed})
          }),
          catchError(() => {
            return of(feedActions.getFeedFailure())
          })
        )
      })
    )
  },
  {functional: true}
)