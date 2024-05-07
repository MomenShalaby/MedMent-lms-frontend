import { Component, OnInit } from '@angular/core';
import { Tag } from '../core/models/tag.model';
import { TagService } from '../core/services/tags/tag.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-interests',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './interests.component.html',
  styleUrls: ['./interests.component.css', '../../assets/css/style.css']
})
export class InterestsComponent implements OnInit{
  tags: Tag[] = [];
  userTags: number[] = [];
  borderColor: string[] = ["#3182c8", "#8b1079", "#faa030", 
  "#64d4d2", "#733ca6", "#c164bd", "#4eb7f5", "#65c888", "#f37e63", "#32babc"];

  constructor(private tagService: TagService) {}

  ngOnInit(): void {
    this.getTags();
  }

  getTags(){
    this.tagService.getTags().subscribe({
      next: (res) => {
        // this.tags = res.data;
      },
      error: (err) => {
        console.log(err);
      }
    });
    this.tags = [{id:1, name: "Dynamic"}, {id:2, name: "Fun"}, {id:3, name: "Playful"}];
  }

  addRemoveTag(e: Event, tagId: number, i: number){
    var index = this.userTags.indexOf(tagId);
    if(index == -1){
      this.userTags.push(tagId);
      (e.target as HTMLElement).style.borderColor = this.borderColor[i % 10];
    }
    else{
      this.userTags.splice(index, 1);
      (e.target as HTMLElement).style.borderColor = "#dadada";
    }
  }

  addUserTags(){
    this.tagService.addUserTags(this.userTags).subscribe({
      next: (res) => {

      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
