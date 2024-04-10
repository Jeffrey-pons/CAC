import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../notification-banner/services/notification.service';
import { MediationService } from '../../../services/mediationService/mediation.service';
import { Mediation, MediationResponse } from '../../../interfaces/mediation.interface';
import { CollectionPermanenteService } from '../../../services/CollectionPService/collection-permanente.service';
import { CollectionPermanente, ArtWorkResponse } from '../../../interfaces/collectionP.interface';
import { NextExpo, NextExpoResponse } from '../../../interfaces/nextExpo.interface';
import { NextExpoServiceService } from '../../../services/nextExpoService/next-expo-service.service';
import { NewsService } from '../../../services/newsService/news.service';
import { News, NewsResponse } from '../../../interfaces/news.interface';
import { ArchivesService } from '../../../services/archiveservice/archives.service';
import { Archive, ArchiveResponse } from '../../../interfaces/archives.interface';


@Component({
  selector: 'app-backoffice',
  templateUrl: './backoffice.component.html',
  styleUrl: './backoffice.component.scss'
})
export class BackofficeComponent implements OnInit {
  mediations: Mediation[] = [];
  newMediation: any = {};
  artworks: CollectionPermanente[] = [];
  newArtWork: any = {};
  nextExpositions: NextExpo[] = [];
  newNextExpo: any = {};
  news: News[] = [];
  newNews: any = {};
  archives: Archive[] = [];
  newArchive: any = {};
  showAddNews = false;
  showAddNextExpo = false;
  showAddMediation = false;
  showAddArtWork = false;
  showAddArchive = false;

  constructor(
    private mediationService: MediationService,
    private collectionService: CollectionPermanenteService,
    private nextExpoService: NextExpoServiceService,
    private newService: NewsService,
    private archivesService: ArchivesService,
    public notificationService: NotificationService
    ) {}

    ngOnInit(): void {
      this.getAllMediations();
      this.getArtWork();
      this.getNextExpo();
      this.getNews();
      this.getArchives();
    }

  // News CRUD operations
  createNews(news: News) {
    this.newService.createNews(news).subscribe(
      (response: NewsResponse) => {
        this.notificationService.setNotification("Le nouveau post a été créé avec succès. \u2713");
        if (response && response.newsData && Array.isArray(response.newsData)) {
          this.news.push(...response.newsData);
          this.newNews = {};
        }
        this.getNews();
        this.toggleAddNews();
      },
      error => {
        this.notificationService.setNotification('Erreur lors de la création du nouveau post. \u2613');
        console.error('Erreur lors de la création du nouveau post :', error);
      }
    );
  }
  handleFileInputNews(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    if (files) {
      this.newNews.images = Array.from(files);
    }
  }
  getNews(): void {
    this.newService.getNews().subscribe(
      (response: NewsResponse) => {
        if (response && response.newsData && Array.isArray(response.newsData)) {
          this.news = response.newsData.map((news: News) => ({
            ...news,
            editMode: false,
            image: news.image.length > 0 ? ['http://localhost:5000/' + news.image[0].replace(/\\/g, '/')] : []

          }));
        }
      },
      error => {
        console.error('Erreur lors de la récupération des posts :', error);
      }
    );
  }
  toggleEditModeNews(news: any) {
    news.editMode = !news.editMode;
  }
  cancelEditNews(news: any) {
    news.editMode = false;
  }
  updateNews(news: News) {
    this.newService.updateNews(news._id, news).subscribe(
      () => {
        this.notificationService.setNotification("Les informations du post ont été mises à jour avec succès. \u2713");
        news.editMode = false;
      },
      error => {
        this.notificationService.setNotification('Erreur lors de la mise à jour des informations du post. \u2613');
        console.error('Erreur lors de la mise à jour du post :', error);
      }
    );
  }
  deleteNews(news: any) {
    this.newService.deleteNewsbyId(news._id).subscribe(
      () => {
        this.notificationService.setNotification(" Ce post a bien été supprimé des posts du Cac \u2713");
        this.news = this.news.filter(n => n._id !== news._id);
      },
      error => {
        this.notificationService.setNotification('Erreur lors de la suppression du post. \u2613');
        console.error('Erreur lors de la suppression du post :', error);
      }
    );
  }
  toggleAddNews() {
    this.showAddNews = !this.showAddNews;
  }

  // NextExpo CRUD operations
  createNextExpo(nextExpo: NextExpo) {
    this.nextExpoService.createNextExpo(nextExpo).subscribe(
      (response: NextExpoResponse) => {
        this.notificationService.setNotification("La nouvelle exposition a été créée avec succès. \u2713");
        if (response && response.nextExpoData && Array.isArray(response.nextExpoData)) {
          this.nextExpositions.push(...response.nextExpoData);
          this.newNextExpo = {};
        }
        this.getNextExpo();
        this.toggleAddNextExpo()
      },
      error => {
        this.notificationService.setNotification('Erreur lors de la création de la nouvelle exposition. \u2613');
        console.error('Erreur lors de la création de la nouvelle exposition :', error);
      }
    );
  }
  handleFileInputNextExpo(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    this.newNextExpo.image = file;
  }
  getNextExpo(): void {
    this.nextExpoService.getNextExpo().subscribe(
      (response: NextExpoResponse) => {
        if (response && response.nextExpoData && Array.isArray(response.nextExpoData)) {
          this.nextExpositions = response.nextExpoData.map((nextExpo: NextExpo) => ({
            ...nextExpo,
            editMode: false,
            image: 'http://localhost:5000/' + nextExpo.image.replace(/\\/g, '/')
          }));
        }
      },
      error => {
        console.error('Erreur lors de la récupération des prochaines expositions :', error);
      }
    );
  }
  toggleEditModeNextExpo(nextExpo: any) {
    nextExpo.editMode = !nextExpo.editMode;
  }
  cancelEditNextExpo(nextExpo: any) {
    nextExpo.editMode = false;
  }
  updateNextExpo(nextExpo: NextExpo) {
    this.nextExpoService.updateNextExpo(nextExpo._id, nextExpo).subscribe(
      () => {
        this.notificationService.setNotification("Les informations de l'exposition ont été mises à jour avec succès. \u2713");
        nextExpo.editMode = false;
      },
      error => {
        this.notificationService.setNotification('Erreur lors de la mise à jour des informations de l\'exposition. \u2613');
        console.error('Erreur lors de la mise à jour de l\'exposition :', error);
      }
    );
  }
  deleteNextExpo(nextExpo: any) {
    this.nextExpoService.deleteNextExpobyId(nextExpo._id).subscribe(
      () => {
        this.notificationService.setNotification(" Cette exposition a bien été supprimé des prochaines expositions du Cac \u2713");
        this.nextExpositions = this.nextExpositions.filter(n => n._id !== nextExpo._id);
      },
      error => {
        this.notificationService.setNotification('Erreur lors de la suppression de l\'exposition. \u2613');
        console.error('Erreur lors de la suppression de l\'exposition :', error);
      }
    );
  }
  toggleAddNextExpo() {
    this.showAddNextExpo = !this.showAddNextExpo;
  }

  // Mediation CRUD operations
  createMediation(mediation: Mediation) {
    this.mediationService.createMediation(mediation).subscribe(
      (response: MediationResponse) => {
        this.notificationService.setNotification("La nouvelle médiation a été créée avec succès. \u2713");
        if (response && response.mediationData && Array.isArray(response.mediationData)) {
          this.mediations.push(...response.mediationData);
          this.newMediation = {}
        }
        this.getAllMediations();
        this.toggleAddMediation();
      },
      error => {
        this.notificationService.setNotification('Erreur lors de la création de la nouvelle médiation. \u2613');
        console.error('Erreur lors de la création de la nouvelle médiation :', error);
      }
    );
  }
  handleFileInputMediation(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    this.newMediation.image = file;
  }
  getAllMediations(): void {
    this.mediationService.getAllMediation().subscribe(
      (response: MediationResponse) => {
        if (response && response.mediationData && Array.isArray(response.mediationData)) {
          this.mediations = response.mediationData.map((mediations: Mediation) => ({
            ...mediations,
            editMode: false,
            image: 'http://localhost:5000/' +  mediations.image.replace(/\\/g, '/')
          }));
        }
      },
      error => {
        console.error('Erreur lors de la récupération des médiations :', error);
      }
    );
  }
  toggleEditModeMediation(mediation: any) {
    mediation.editMode = !mediation.editMode;
  }
  cancelEditMediation(mediation: any) {
    mediation.editMode = false;
  }
  updateMediation(mediation: Mediation) {
    this.mediationService.updateMediation(mediation._id, mediation).subscribe(
      () => {
        this.notificationService.setNotification("Les informations de la médiation ont été mises à jour avec succès. \u2713");
        mediation.editMode = false;
      },
      error => {
        this.notificationService.setNotification('Erreur lors de la mise à jour des informations de la médiation. \u2613');
        console.error('Erreur lors de la mise à jour de la médiation :', error);
      }
    );
  }
  deleteMediation(mediation: any) {
    this.mediationService.deleteMediation(mediation._id).subscribe(
      () => {
        this.notificationService.setNotification(" Cette médiation a bien été supprimé des médiations du Cac \u2713");
        this.mediations = this.mediations.filter(m => m._id !== mediation._id);
      },
      error => {
        this.notificationService.setNotification('Erreur lors de la suppression de la médiation. \u2613');
        console.error('Erreur lors de la suppression de la médiation :', error);
      }
    );
  }
  toggleAddMediation() {
    this.showAddMediation = !this.showAddMediation;
  }

  // Collection Permanente CRUD operations
  createArtWork(artwork: CollectionPermanente) {
    this.collectionService.createArtWork(artwork).subscribe(
      (response: ArtWorkResponse) => {
        this.notificationService.setNotification("La nouvelle oeuvre a été créée avec succès. \u2713");
        if (response && response.artWorkData && Array.isArray(response.artWorkData)) {
          this.artworks.push(...response.artWorkData);
          this.newArtWork = {};
        }
        this.getArtWork();
        this.toggleAddArtWork();
      },
      error => {
        this.notificationService.setNotification('Erreur lors de la création de la nouvelle oeuvre. \u2613');
        console.error('Erreur lors de la création de la nouvelle oeuvre :', error);
      }
    );
  }
  handleFileInputArtwork(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    this.newArtWork.image = file;
  }
  getArtWork(): void {
    this.collectionService.getArtWork().subscribe(
      (response: ArtWorkResponse) => {
        if (response && response.artWorkData && Array.isArray(response.artWorkData)) {
          this.artworks = response.artWorkData.map((artwork: CollectionPermanente) => ({
            ...artwork,
            editMode: false,
            image: 'http://localhost:5000/' + artwork.image.replace(/\\/g, '/')
          }));
      }
    },
      error => {
        console.error('Erreur lors de la récupération des oeuvres de la collection permanente :', error);
      }
    );
  }
  toggleEditModeArtWork(artwork: any) {
    artwork.editMode = !artwork.editMode;
  }
  cancelEditArtWork(artwork: any) {
    artwork.editMode = false;
  }
  updateArtWork(artwork: CollectionPermanente) {
    this.collectionService.updateArtWork(artwork._id, artwork).subscribe(
      () => {
        this.notificationService.setNotification("Les informations de l'oeuvre ont été mises à jour avec succès. \u2713");
        artwork.editMode = false;
      },
      error => {
        this.notificationService.setNotification('Erreur lors de la mise à jour des informations de l\'oeuvre. \u2613');
        console.error('Erreur lors de la mise à jour de l\'oeuvre :', error);
      }
    );
  }
  deleteArtWork(artwork: any) {
    this.collectionService.deleteArtWork(artwork._id).subscribe(
      () => {
        this.notificationService.setNotification(" Cette oeuvre a bien été supprimé de la collection permanente du Cac \u2713");
        this.artworks = this.artworks.filter(a => a._id !== artwork._id);
      },
      error => {
        this.notificationService.setNotification('Erreur lors de la suppression de l\'oeuvre. \u2613');
        console.error('Erreur lors de la suppression de l\'oeuvre :', error);
      }
    );
  }
  toggleAddArtWork() {
    this.showAddArtWork = !this.showAddArtWork;
  }

  // Archives CRUD operations
  handleFileInputArchive(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    this.newArchive.image = file;
  }
  getArchives(): void {
    this.archivesService.getArchives().subscribe(
      (response: ArchiveResponse) => {
        if (response && response.ArchivesData && Array.isArray(response.ArchivesData)) {
          this.archives = response.ArchivesData.map((archive: Archive) => ({
            ...archive,
            editMode: false,
            image: archive.image && archive.image.length > 0 ? ['http://localhost:5000/' + archive.image[0].replace(/\\/g, '/')] : []
          })).reverse();
        }
      },
      error => {
        console.error('Erreur lors de la récupération des archives :', error);
      }
    );
  }


  toggleEditModeArchive(archive: any) {
    archive.editMode = !archive.editMode;
  }
  cancelEditArchive(archive: any) {
    archive.editMode = false;
  }
  updateArchive(archive: Archive) {
    console.log(archive);
    this.archivesService.updateArchive(archive._id, archive).subscribe(
      () => {
        this.notificationService.setNotification("Les informations de l'archive ont été mises à jour avec succès. \u2713");
        archive.editMode = false;
      },
      error => {
        this.notificationService.setNotification('Erreur lors de la mise à jour des informations de l\'archive. \u2613');
        console.error('Erreur lors de la mise à jour de l\'archive :', error);
      }
    );
  }
  deleteArchive(archive: any) {
    this.archivesService.deleteArchivebyId(archive._id).subscribe(
      () => {
        this.notificationService.setNotification(" Cette archive a bien été supprimé des archives du Cac \u2713");
        this.archives = this.archives.filter(a => a._id !== archive._id);
      },
      error => {
        this.notificationService.setNotification('Erreur lors de la suppression de l\'archive. \u2613');
        console.error('Erreur lors de la suppression de l\'archive :', error);
      }
    );
  }
  toggleAddArchive() {
    this.showAddArchive = !this.showAddArchive;
  }
}
