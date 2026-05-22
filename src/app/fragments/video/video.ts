import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Video } from '../../models/video';
import { VideoService } from '../../services/video';

@Component({
  selector: 'app-video',
  imports: [],
  templateUrl: './video.html',
  styleUrl: './video.css',
})
export class VideoFragment {
  private readonly router: Router = inject(Router)
  private readonly videosService: VideoService = inject(VideoService)
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  video = signal<Video>({id:0, name:"Video not found", url:"", description: ""});
  videoId!: number;

  constructor() {
    this.route.paramMap.subscribe(paramMap => {
      const id = paramMap.get('id');
      if (id == null) {
        this.router.navigate(['/']);
        return;
      }

      this.videoId = +id;
      const videoFromStorage = this.videosService.getById(this.videoId);

      if (videoFromStorage) {
        this.video.set(videoFromStorage);
      }
    });
  }
}
