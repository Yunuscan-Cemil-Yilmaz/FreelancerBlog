import { Component } from '@angular/core';
import { Education } from '../../component/education/education.component';
import { Bio } from '../../component/bio/bio.component';
import { Experience } from '../../component/experience/experience.component';
import { ProfessionalSkills } from '../../component/professional-skills/professional-skills.component';
import { References } from '../../component/references/references.component';
import { TechStack } from '../../component/tech-stack/tech-stack.component';

@Component({
  selector: 'app-about',
  imports: [Education, Bio, Experience, ProfessionalSkills, References, TechStack],
  styleUrl: './about.component.scss',
  templateUrl: './about.component.html',
})
export class AboutComponent {}

